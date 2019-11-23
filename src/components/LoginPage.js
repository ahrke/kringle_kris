import React from 'react';
import * as firebase from 'firebase';

import './styles/login.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
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
  }

  onInput = (value, type) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    return (
      <div className='login_page'>
        <input type='email' placeholder='email...' id='user_email' onChange={e => this.onInput(e.target.value, 'email')} />
        <input type='password' placeholder='password' id='user_password' onChange={e => this.onInput(e.target.value, 'password')} />
        <button onClick={this.onClickHandler} >Login</button>
       </div>
    )
  }
}

export default LoginPage;