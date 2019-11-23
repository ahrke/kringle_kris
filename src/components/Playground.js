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

    const randomAssign = usersArr =>{
      this.state.users.forEach(u => {
        let recipient = usersArr.splice(Math.floor(Math.random() * usersArr.length), 1)[0]
        
        firebase.database().ref('users/' + u.key).update({
          recipient
        })
      })
    } 

    randomAssign(users)

    // let everythingOK = true

    // do {
    //   snap.forEach(s => {
    //     let newState = this.state.users
    //     let u = {
    //       key: s.key,
    //       ...s.val()
    //     }
    //     newState.push(u)
    //     this.setState({
    //       users: newState
    //     })
    //   })

    //   let us = this.state.users

    //   for (let i = 0; i < us.length - 1; i++) {
    //     if (us[i].name === us[i].recipient) {
    //       everythingOK = false;
    //       randomAssign(users)
    //       continue;
    //     }
    //   } 

    //   everythingOK = true
    // } while (everythingOK)

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