import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile'
import LogIn from './components/Login';

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      }
    };
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Home accountBalance={this.state.accountBalance} />} />
          <Route 
          exact 
          path='/login' render={() => <LogIn 
            user={this.state.currentUser} 
            mockLogIn={this.mockLogIn} />} 
          />
          <Route
            exact
            path='/userProfile'
            render={() => <UserProfile 
                userName={this.state.currentUser.userName} 
                memberSince={this.state.currentUser.memberSince}  />}
          />
          <Route
            exact
            path='/accountbalance'
            render={() => <h1> Account Balance Route </h1>}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;