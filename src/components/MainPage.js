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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        })
        console.log("==|> user:",user)
      } else {
        console.log("==> no user")
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
        <h2>{this.state.user.email}</h2>
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