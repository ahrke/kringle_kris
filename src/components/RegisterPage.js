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
      poke_num: ''
    }
  }

  onComponentDidMount() {

  }

  onClickHandler = (e) => {
    e.preventDefault();

    firebase.database().ref().child('users').child(this.state.name.trim() + this.state.poke_num).set({
      name: this.state.name,
      poke_num: this.state.poke_num,
      email: this.state.email
    })
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (user) {
          this.props.history.push('/')
        } else {
          
        }
      })
    
  }

  onInput = (value, type) => {
    this.setState({
      [type]: value
    })
  }

  render() {
    return (
      <div className='register_page'>
        <input type='text' placeholder='name...' id='user_name' onChange={e => this.onInput(e.target.value, 'name')} />
        <input type='number' placeholder='number between 1 - 150' id='poke_num' onChange={e => this.onInput(e.target.value, 'poke_num')} />
        <input type='email' placeholder='email...' id='user_email' onChange={e => this.onInput(e.target.value, 'email')} />
        <input type='password' placeholder='password' id='user_password' onChange={e => this.onInput(e.target.value, 'password')} />
        <button onClick={this.onClickHandler} >Sign up</button>
       </div>
    )
  }
}

export default RegisterPage;