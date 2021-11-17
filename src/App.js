
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
      accountBalance: 0,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: [],

    };
  }

  async componentDidMount() {
    // Fetching debits from datapoint
    const debits_response = await fetch('https://moj-api.herokuapp.com/debits')
    const debits = await debits_response.json()

    // Fetching credits from datapoint
    const credits_response = await fetch('https://moj-api.herokuapp.com/credits')
    const credits = await credits_response.json()

    // Calculating total from credits subtracting debits
    let total = 0
    // adding credits and subtracting debits from the total 
    credits.map(credit => total += +credit.amount)
    debits.map(debit => total -= +debit.amount)
    
    // Updating state with new data
    this.setState({
      debits, 
      credits, 
      accountBalance: Math.round((total + Number.EPSILON) * 100) / 100
    })
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  addDebit = () => {}
  addCredit = () => {}

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