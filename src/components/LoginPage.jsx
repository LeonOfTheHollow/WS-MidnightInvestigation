import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    username: 'Username here...',
    password: 'qwert',
  };

  render() {
    return (
      <div className="LoginView">
        <form className="Form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username goes here"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password goes here"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button className="Form__submit" type="submit">Log In</button>
        </form>
        <div className="Sign-up">
          New to Arkham County? <Link to="/register">Sign up here</Link>
        </div>
      </div>
    )
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.props.login(this.state.username, this.state.password);
      console.log("The login action worked ok.");
      console.log(this.props);
    } catch(e) {
      console.log("There was a problem logging in: ", e);
    }
    this.setState({password: ''});
    console.log("Checking for authorization...");
    console.log(this.props);
    if (this.props.authed) {
      console.log("User is authed.");
      this.props.history.push('/');
    }
  }
}

const mapStateToProps = (state) => {
  console.log("Access state: ", state.access.authed);
  return {
    authed: state.access.authed,
  }
}

export default connect(mapStateToProps, { login })(LoginPage);