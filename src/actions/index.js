import * as types from '../constants/ActionTypes';
const axios = require("axios");
// const ROOT_URL = "https://midnightinarkham.herokuapp.com";
const ROOT_URL = "http://localhost:5050";

let nextMessageId = 0;
let nextGameId = 0;
const nextUserId = 0;

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${ROOT_URL}/login`, { username, password });
      const uuID = user.data._id;
      localStorage.setItem("uuID", uuID);
      if (user) dispatch({ 
        type: types.LOGIN_SUCCESS,
        payload: user,
      });
      else dispatch({ type: types.LOGIN_FAILURE });
    } catch(e) {
      console.log("Problem logging in: ", e);
      dispatch({ type: types.LOGIN_FAILURE });
    }
  };
};

export const register = (username, password, confirmPassword) => {
  return async dispatch => {
    try {
      const newUser = await axios.post(`${ROOT_URL}/register`, { username, password });
      console.log("Successfully registered: ", newUser);
    } catch(e) {
      console.log("There was a problem registering: ", e);
    }
  };
};

// export const buildGame = (size) => {
//   return async dispatch => {
//     try {
//       const newGame = await axios.post(`${ROOT_URL}/new-game`, { gameSize: size });
//       console.log("Built a game: ", newGame);
//       dispatch({
//         type: types.NEW_GAME_EXISTS,
//         payload: newGame
//       })
//     } catch(e) {
//       console.log("There was a problem building the game: ", e);
//     }
//   }
// }

export const buildGame = (size) => ({
  type: types.CREATE_GAME,
  size
})

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
})

export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId + 1,
  name
})

export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author
})

export const newGameReceived = (game) => ({
  type: types.NEW_GAME_EXISTS,
  id: nextGameId++,
  game
})


export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})

