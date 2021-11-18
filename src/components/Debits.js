import React, { Component } from 'react'
import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'
import AccountBalance from './AccountBalance'

class Debits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      id: '',
      description: '',
      amount: '',
    };
  }

  addDebit = (e) => {
    e.preventDefault()

    // Create debit object and call addDebit from app.js
    this.props.addDebit({
      id: uuid(),
      date: new Date().toISOString(),
      description: this.state.description,
      amount: +this.state.amount
    });
  }

  render() {
    const { debits } = this.props;

    const drawTable = () =>
      debits.map((debit) => {
        return (
          <tr key={debit.id}>
            <td>{debit.date}</td>
            <td style={{ padding: '0 3rem' }}>{debit.description}</td>
            <td>{debit.amount}</td>
          </tr>
        );
      });

    return (
      <section>
        <Link to='/'>Back to Home</Link>
        <AccountBalance accountBalance={this.props.accountBalance} />

        <h1>Debits</h1>

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
        <h3>Add Debit</h3>
        <form onSubmit={this.addDebit}>
          <label>Description:</label>
          <input
            type='text'
            value={this.state.description}
            onChange={(val) => this.setState({ description: val.target.value })}
          />
          <label>Amount:</label>
          <input
            type='number'
            value={this.state.amount}
            onChange={(val) => {
              this.setState({ amount: val.target.value });
            }}
          />
          <button>Add Debit</button>
        </form>
      </section>
    );
  }
}

export default Debits