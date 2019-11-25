import React from 'react';
import * as firebase from 'firebase';

class Playground extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  onComponentDidMount() {

  }

  addRecipient = () => {
    let users = firebase.database().ref('users').orderByKey()
    users.once('value').then(snap => {
      snap.forEach(s => {
        console.log("==|==|> s:", s.val())
      })
    })

    firebase.database().ref('users/dayumm58').update({
      recipient: 'flashback'
    })
  }

  giveRandomRecipient = async () => {
    let snap = await firebase.database().ref('users').orderByKey().once('value')
    snap.forEach(s => {
      let newState = this.state.users
      let u = {
        key: s.key,
        ...s.val()
      }
      newState.push(u)
      this.setState({
        users: newState
      })
    })

    let users = this.state.users.map(u => u.name)

    const randomAssign = arr => {
      let usersArr = [...arr];
      this.state.users.forEach(u => {
        let duplicate = null;
        if (usersArr.includes(u.name) && usersArr.length > 1) {
          duplicate = usersArr.splice(usersArr.indexOf(u.name),1);
        } else if (usersArr.length === 1 && usersArr[0] === u.name) {
          usersArr[0] = 'RUDOLPH, WE HAVE A PROBLEM!'
        }

        let recipient = usersArr.splice(Math.floor(Math.random() * usersArr.length), 1)[0]
        
        if (duplicate) usersArr.push(u.name);

        firebase.database().ref('users/' + u.key).update({
          recipient
        })
      })
    } 

    randomAssign(users)

    let arr = []
    snap.forEach(s => {
      let arr = [];
      let u = {
        key: s.key,
        ...s.val()
      }
      arr.push(u)
    })

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].name === arr[i].recipient || arr[i].recipient === 'RUDOLPH, WE HAVE A PROBLEM!') {
        console.log('RUDOLPH, WE HAVE A PROBLEM!');
        // randomAssign(users)
        break;
      } 
    } 

    console.log("whooo...we're good. Everything's got a recipient")
  }

  emailVerification = () => {
    firebase.auth().currentUser.sendEmailVerification().then(res => {
      console.log("==|==|> email sent! res:", res)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.giveRandomRecipient} >Add random recipient</button>
        {this.state.users && this.state.users.map(u => <h3>{u.name}</h3>)}
      </div>
    )
  }
}

export default Playground;