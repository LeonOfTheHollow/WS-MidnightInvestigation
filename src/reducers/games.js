import * as types from "../constants/ActionTypes";

const games = (state = [], action) => {
  switch(action.type) {
    case types.CREATE_GAME:
      return state;
    case types.NEW_GAME_EXISTS:
      console.log("Modifying state based on new game detected: ", action);
      return state.concat([
        {
          game: action.game,
        }
      ])
    default:
      return state;
  }
}

export default games;