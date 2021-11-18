
import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile'
import LogIn from './components/Login';
import Debits from './components/Debits'

class App extends Component {
  constructor(props) {
    super(props);

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

    const accountBalance = this.calculateBalance(debits, credits)
    
    // Updating state with new data
    this.setState({
      debits, 
      credits, 
      accountBalance
    })
  }

  // Calculating total from credits subtracting debits
  calculateBalance = (debits = this.state.debits, credits = this.state.credits) => {
    let total = 0
    
    // adding credits and subtracting debits from the total 
    credits.map(credit => total += +credit.amount)
    debits.map(debit => total -= +debit.amount)

    total = Math.round((total + Number.EPSILON) * 100) / 100

    return total
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  addDebit = (debit) => {
    const debits = [...this.state.debits]
    debits.push(debit)
    this.setState({debits: debits}, () => {
      const accountBalance = this.calculateBalance()
      this.setState({accountBalance})
    })
  }
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
          <Route
            exact
            path='/debits'
            render={() => <Debits 
                            debits={this.state.debits} 
                            addDebit={this.addDebit} 
                            accountBalance={this.state.accountBalance} />
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;