import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import Snow from 'react-snow-effect';
import gifts from '../images/gifts_1.png';
import tag from '../images/dog_cat_tag.jpg';

import './styles/main.css';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    console.log("component did mount...mainpage")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).once('value').then(u => {
          console.log("inside u:",u.val())
          let user = u.val()
          this.setState({
            user
          })
        })
      }
    })
  }

  logout = e => {
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

  noUserButtons = () => {
    return (
      <div className='main_auth_buttons'>
        <button 
          onClick={this.register}
          className='main_page-button'
        >
          Sign up!
        </button>
        <button 
          onClick={this.login}
          className='main_page-button'
        >
          Login
        </button>
      </div>
    )
  }

  mainPage = () => {
    return (
      <div className='main_auth_buttons'>
        <Snow />
        {/* <h2>Hey {this.state.user.name}!</h2>
        <h4>{this.state.user.email}</h4>
        <h3>Recipient: {this.state.user.recipient || '  --  '}</h3> */}
        {/* <h2>{this.state.user.poke_num}</h2> */}
        <div className='tag'>
          <img src={tag} style={{ width: '20%' }} />
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
    )
  }

  render() {
    return (
      <div className='main_page'>
        {/* <h1>Main Page</h1> */}
        {!this.state.user ? this.noUserButtons() : this.mainPage()}
      </div>
    )
  }
}

export default MainPage;