import React, { Component } from 'react';
import logo from '../css/logo.svg';
import '../css/App.css';

const done = {
  textDecoration: "line-through"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Student Wallet</h1>
        </header>
        <p className="App-intro">
          Under construction.
          Will change template soon.
        </p>
        <p>TODO:</p>
        <ul>
          <li style={done}>Firebase integration</li>
          <li>Welcome page, which collects user data</li>
          <li>User authentication using Phone</li>
          <li>Home page with Transaction history</li>
          <li>Add new transaction</li>
        </ul>
      </div>
    );
  }
}

export default App;
