import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './app.css';
import Home from './home';
import Issues from './issues';
import SingleIssue from './single-issue';
import Characters from './characters';
import SingleCharacter from './single-character';

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
            <SingleIssue path="/issues/:id" />
            <Characters path="/characters" />
            <SingleCharacter path="/characters/:id" />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
