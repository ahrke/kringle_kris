import React from 'react';
import * as firebase from 'firebase';

import './styles/register.css';

class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      poke_num: '',
      err: null
    }
  }

  onComponentDidMount() {

  }

  onClickHandler = (e) => {
    e.preventDefault();

    if (!this.state.name || !this.state.email || !this.state.password) {
      this.setState({
        err: 'Please fill in all fields. You want to end up on the naughty list?'
      })

      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
      if (user) {
        firebase.database().ref('users').child(user.user.uid).set({
          name: this.state.name,
          poke_num: this.state.poke_num || Math.floor(Math.random() * 150),
          email: this.state.email
        })
        .then (res => {
          this.props.history.push('/')
        })
      } else {
        
      }
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
      <div className='register_page'>
        <h4>{this.state.err}</h4>
        <form onSubmit={this.onClickHandler} >
          <input type='text' 
            className='register_page-input' placeholder='name...' id='user_name' 
            onChange={e => this.onInput(e.target.value, 'name')} 
          />
          <input type='number' 
            className='register_page-input' placeholder='number between 1 - 150' id='poke_num' 
            onChange={e => this.onInput(e.target.value, 'poke_num')} 
          />
          <input type='email' 
            className='register_page-input' placeholder='email...' id='user_email' 
            onChange={e => this.onInput(e.target.value, 'email')} 
          />
          <input type='password' 
            className='register_page-input' placeholder='password' id='user_password' 
            onChange={e => this.onInput(e.target.value, 'password')} 
          />
          <button type='submit' 
            className='register_page-input register_page-button' 
          >
            Sign up
          </button>
        </form>
       </div>
    )
  }
}

export default RegisterPage;