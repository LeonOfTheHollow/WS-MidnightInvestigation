import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameScreen from "./GameScreen";
import Lobby from "./Lobby";

class Viewport extends Component {
  
  render() {
    return (
      <div className="Viewport">
        <p>This is {this.props.loggedInUser}'s viewport.</p>
        {
          this.props.activeGame ? 
            <GameScreen />
          :
            <Lobby />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.access.currentUser.username,
  }
}

export default connect(mapStateToProps)(Viewport);