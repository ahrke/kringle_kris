import React from 'react';
import * as firebase from 'firebase';

import './styles/login.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      err: null
    }
  }

  onComponentDidMount() {

  }

  onClickHandler = (e) => {
    e.preventDefault();
    console.log("==|> email:",this.state.email," | pass:",this.state.password )
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log("==|> err from login:",err)
        this.setState({
          err: 'Email and password do not match, or user does not exist. Kringle says try again'
        })
      })
  }

  onInput = (value, type) => {
    this.setState({
      [type]: value,
      err: null
    })
  }

  render() {
    return (
      <div className='login_page'>
        <h4 style={{ color: 'var(--red_2)' }}>{this.state.err}</h4>
        <form onSubmit={this.onClickHandler}>
          <input type='email' 
            className='login_page-input' placeholder='email...' id='user_email' 
            onChange={e => this.onInput(e.target.value, 'email')} 
          />
          <input type='password' 
            className='login_page-input' placeholder='password' id='user_password' 
            onChange={e => this.onInput(e.target.value, 'password')} 
          />
          <button type='submit' 
            className='login_page-input login_page-button' 
          >
            Login
          </button>
        </form>
       </div>
    )
  }
}

export default LoginPage;