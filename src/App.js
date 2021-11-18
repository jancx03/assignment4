// React Modules
import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
// Components
import Home from './components/Home';
import UserProfile from './components/UserProfile'
import LogIn from './components/Login';
import Debits from './components/Debits'
import Credits from './components/Credits'

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

    // Calculating the account balance substrating debits from credits
    const accountBalance = this.calculateBalance(debits, credits)
    
    // Updating state with new data
    this.setState({
      debits, 
      credits, 
      accountBalance
    })
  }

  // Calculating total sbustrating debits from credits
  calculateBalance = (debits = this.state.debits, credits = this.state.credits) => {
    // Accumulator
    let total = 0
    
    // Adding credits to accumulator
    credits.map(credit => total += +credit.amount)

    // Substracting debits from accumulator
    debits.map(debit => total -= +debit.amount)

    // Rounding number to two decimal points
    total = Math.round((total + Number.EPSILON) * 100) / 100

    return total
  }

  
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // Add debit to debits array and calculate new Account Balance
  addDebit = (debit) => {
    // Copying debits array
    const debits = [...this.state.debits]
    
    // Adding new debit to local copy of debits array
    debits.push(debit)

    // Updating debits state
    this.setState({debits: debits}, () => {
      // calculating new account balance
      const accountBalance = this.calculateBalance()
      // updating accountBalance state
      this.setState({accountBalance})
    })
  }
  //Add credits to credits array and calculate new Account Balance (same as above)
  addCredit = (credit) => {
    const credits = [...this.state.credits]
    credits.push(credit)

    this.setState({credits: credits}, () => {
      const accountBalance = this.calculateBalance()
      this.setState({accountBalance})
    })
  }

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
          <Route
            exact
            path='/credits'
            render={() => <Credits 
                            credits={this.state.credits} 
                            addCredit={this.addCredit} 
                            accountBalance={this.state.accountBalance} />
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;