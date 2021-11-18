import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// Module used to generate unique id
import { uuid } from 'uuidv4'
import AccountBalance from './AccountBalance'

class Credits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      id: '',
      description: '',
      amount: '',
    };
  }

  addCredit = (e) => {
    e.preventDefault()

    // Create credit object and call addCredit from app.js
    this.props.addCredit({
      id: uuid(),
      date: new Date().toISOString(),
      description: this.state.description,
      amount: +this.state.amount
    });
  }

  render() {
    const { credits } = this.props;

    const drawTable = () =>
      credits.map((credit) => {
        return (
          <tr key={credit.id}>
            <td>{credit.date}</td>
            <td style={{ padding: '0 3rem' }}>{credit.description}</td>
            <td>{credit.amount}</td>
          </tr>
        );
      });

    return (
      <section>
        <Link to="/" >Back to Home</Link>
        <AccountBalance accountBalance={this.props.accountBalance}/>

        <h1>Credits</h1>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{drawTable()}</tbody>
        </table>

        <hr />
        <h3>Add Credit</h3>
        <form onSubmit={this.addCredit}>
          <label>Description:</label>
          <input 
            type='text' 
            value={this.state.description} 
            onChange={(val) => this.setState({description: val.target.value})} />
          <label>Amount:</label>
          <input
            type='number'
            value={this.state.amount}
            onChange={(val) => {this.setState({ amount: val.target.value })}}
          />
          <button>Add Credit</button>
        </form>
      </section>
    );
  }
}

export default Credits