import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './app.css';
import Home from './home';
import Issues from './issues';
import Characters from './characters';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <Link to="/">Home</Link>
          <Link to="/issues">Issues</Link>
          <Link to="/characters">Characters</Link>
        </header>
        <main className="main">
          <Router>
            <Home path="/" />
            <Issues path="/issues" />
            <Characters path="/characters" />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
