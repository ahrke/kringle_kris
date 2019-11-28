import React from 'react';
import { Link } from 'react-router-dom';

import './styles/nav.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav'>
        <h3 style={{ paddingLeft: '10px' }}>Kringle Kris</h3>
        <div>
          <h4>
            <Link to='/' className='link'>
              Home
            </Link>
          </h4>
          <h5>/</h5>
          <h4>
            <Link to='/rules' className='link'>
              Rules
            </Link>
          </h4>
        </div>
      </div>
    )
  }
}

export default NavBar;