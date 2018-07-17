import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buildGame } from "../actions";

class Lobby extends Component {
  state = {
    numberOfPlayersField: '',
  };

  handleBuildGameSubmit = async (event) => {
    event.preventDefault();
    await this.props.buildGame(this.state.numberOfPlayersField);
  }

  handleNumberOfPlayersFieldChange = event => {
    this.setState({ numberOfPlayersField: event.target.value })
  }
  
  render() {
    console.log("Rendering with these props: ", this.props);
    return (
      <div className="Lobby">
        <p>This is the lobby for Midnight in Arkham</p>
        <form className="Form" onSubmit={this.handleBuildGameSubmit}>
          <input
            type="text"
            placeholder="# of players"
            value={this.state.numberOfPlayersField}
            onChange={this.handleNumberOfPlayersFieldChange}
          />
          <button className="Form__submit" type="submit">Initialize a game</button>
        </form>
        {this.props.availableGames ? <div className="Available-Games">
          {
            this.props.availableGames.map((gameData, i) => {
              console.log("Available game data: ", gameData);
              if (gameData) return (
                <div key={i} onClick={async () => {
                  //await this.props.joinGame(gameData);
                  console.log("Blech");
                }}>
                  {gameData.game.title}
                </div>
              )
            })
          }
        </div> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedInUser: state.access.currentUser.username,
    availableGames: state.games
  }
}

export default connect(mapStateToProps, { buildGame })(Lobby);