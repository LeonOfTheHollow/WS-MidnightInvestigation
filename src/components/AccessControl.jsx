import React, { Component } from 'react';
import { connect } from 'react-redux';

const AccessControl = ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        console.log("Not authorized - redirecting. . .",  this.props)
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? (
            <ComposedComponent />
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.access.authed,
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};

export default AccessControl;