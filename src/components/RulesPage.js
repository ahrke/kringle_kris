import React from 'react';
import elfBoy from '../images/elf_boy.png';
import elfGirl from '../images/elf_girl.png';

import './styles/rules.css';

class RulesPage extends React.Component {
  render() {
    return (
      <div className='rules_container page'>
        <h2>The rules:</h2>
        <ul>
          <li>$25 limit (though if you want to go higher, that's cool too)</li>
          <li>NO gift cards</li>
          <li>NO snacks, or pass-down gifts</li>
        </ul>
        <div className='rules_imgs'>
          <img src={elfBoy} />
          <img src={elfGirl} />
        </div>
      </div>
    )
  }
}

export default RulesPage;