import React from 'react';
import * as firebase from 'firebase';
import { CSSTransition } from 'react-transition-group';

import Loading from './Loading';
import NoUserPage from './NoUserPage';

import Snow from 'react-snow-effect';
import gifts from '../images/gifts_1.png';
import tag from '../images/dog_cat_tag.jpg';

import './styles/main.css';


class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null, 
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid) {
        firebase.database().ref('users/' + user.uid).once('value').then(u => {
          console.log("inside u:",u.val())
          let user = u.val()
          this.setState({
            user,
            loading: false
          })
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  logout = () => {
    firebase.auth().signOut();
    this.setState({
      user: null
    })
  }
  
  register = e => {
    this.props.history.push('/register');
  }

  login = e => {
    this.props.history.push('/login');
  }

  noUser = () => {
    return (
      // <CSSTransition
      //     in={true}
      //     appear={true}
      //     timeout={1000}
      //     // classNames="fade"
      //     out={true}
      //   >
          <NoUserPage register={this.register} login={this.login} />
        // </CSSTransition>
    )
  }

  loading = () => {
    return (
      <CSSTransition
          appear={true}
          timeout={1000}
          classNames="fade"
          out={true}
        >
          <Loading />
        </CSSTransition>
    )
  }

  mainPage = () => {
    return (
      <CSSTransition
        appear={true}
        timeout={1000}
        classNames="fade"
        out={true}
      >
        <div className='main_auth_buttons'>
          <Snow />
          {/* <h2>Hey {this.state.user.name}!</h2>
          <h4>{this.state.user.email}</h4>
          <h3>Recipient: {this.state.user.recipient || '  --  '}</h3> */}
          {/* <h2>{this.state.user.poke_num}</h2> */}
          <div className='tag'>
            <img src={tag} />
            <h4 className='to'>{this.state.user.recipient || '  --  '}</h4>
            <h4 className='from'>{this.state.user.name}</h4>
          </div>
          <img src={gifts} style={{ width: "30%", borderRadius: '5px' }} />
          <button 
            onClick={this.logout}
            className='main_page-button'
          >
            logout
          </button>
        </div>
      </CSSTransition>
    )
  }

  render() {
    return (
      <div className='main_page'>
        {/* <h1>Main Page</h1> */}
        {!this.state.user ? 
          this.state.loading ? this.loading() : this.noUser()
          : this.mainPage()}
      </div>
    )
  }
}

export default MainPage;