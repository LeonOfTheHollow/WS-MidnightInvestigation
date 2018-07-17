import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameScreen extends Component {
  
  render() {
    return (
      <div className="GameScreen">
        <p>This is the game screen for {this.props.loggedInUser}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.access.currentUser.username,
  }
}

export default connect(mapStateToProps)(GameScreen);