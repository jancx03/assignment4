import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/login' render={() => <h1> Login Route </h1>} />
          <Route exact path="/userProfile" render={() => <h1> User Profile Route </h1>}/>
          <Route exact path="/accountbalance" render={() => <h1> Account Balance Route </h1>}/>
          
        </Switch>
      </Router>
    );
  }
}

export default App;