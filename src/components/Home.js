// src/components/Home.js

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';

class Home extends Component {
  render() {
      
    return (
        <div>
          <img src="https://picsum.photos/201" alt="bank"/>
          <h1>Bank of React</h1>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;