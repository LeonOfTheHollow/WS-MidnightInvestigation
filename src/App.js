import React, { Component } from 'react';
import './App.css';
import { Sidebar } from "./containers/Sidebar";
import { MessagesList } from "./containers/MessagesList";
import { AddMessage } from "./containers/AddMessage";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Viewport from './components/Viewport';

class App extends Component {
  render() {
    return (
      <div id="container">
        <Router>
          <Route path="/" render={() => <Viewport/>} exact />
        </Router>
      </div>
    );
  }
}

export default App;
