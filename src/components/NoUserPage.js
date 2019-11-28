import React from 'react';

class NoUserPage extends React.Component {
  
  render () {
    return (
      <div className='main_auth_buttons'>
        <button 
          onClick={this.props.register}
          className='main_page-button'
        >
          Sign up!
        </button>
        <button 
          onClick={this.props.login}
          className='main_page-button'
        >
          Login
        </button>
      </div>
    )
  }
}

export default NoUserPage;