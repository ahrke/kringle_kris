import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';

import MainPage from '../src/components/MainPage';
import LoginPage from '../src/components/LoginPage';
import RegisterPage from '../src/components/RegisterPage';

import Playground from '../src/components/Playground';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: null
    }
  }

  componentDidMount() {
    // const rootRef = firebase.database().ref().child('users');

    // rootRef.on('value', snap => {
    //   this.setState({
    //     users: snap.val()
    //   })
    // })

    firebase.auth().onAuthStateChanged(user => {
      console.log("inside app compDidMount")
      firebase.database().ref('users/' + user.uid).once('value').then(u => {
        this.setState({
          user: {
            name: u.name,
            email: u.email,
            poke_num: u.poke_num
          }
        })
      })
    })
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/playground' component={Playground} />
        </Switch>
      </div>
    )
  }
  
}

export default App;
