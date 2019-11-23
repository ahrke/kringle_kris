import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

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
      <div>
        <Link to='/register'>
          <button>Sign up!</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    )
  }

  mainPage = () => {
    return (
      <div>
        <h2>{this.state.user.email}</h2>
        <button onClick={e => {
          firebase.auth().signOut();
          this.setState({
            user: null
          })
        }}>
          logout
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Main Page</h1>
        {!this.state.user ? this.noUserButtons() : this.mainPage()}
      </div>
    )
  }
}

export default MainPage;