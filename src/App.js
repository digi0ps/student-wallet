import React, { Component } from 'react';
import logo from './css/logo.svg';
import './css/App.css';

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
          <li>Firebase integration</li>
          <li>Reading and writing to database</li>
          <li>Input fields</li>
          <li>Displaying data</li>
          <li>Better UI</li>
        </ul>
      </div>
    );
  }
}

export default App;
