import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

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

  noUserButtons = () => {
    return (
      <div className='main_auth_buttons'>
        <button 
          onClick={e => {
            this.props.history.push('/register');
          }}
          className='main_page-button'
        >
          Sign up!
        </button>
        <button 
          onClick={e => {
            this.props.history.push('/login');
          }}
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
        <h2>Hey {this.state.user.name}!</h2>
        <h4>{this.state.user.email}</h4>
        <h3>Recipient: {this.state.user.recipient || '  --  '}</h3>
        {/* <h2>{this.state.user.poke_num}</h2> */}
        <button 
          onClick={e => {
            firebase.auth().signOut();
            this.setState({
              user: null
            })
          }}
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