import * as types from '../constants/ActionTypes'
import { addUser, messageReceived, populateUsersList, newGameReceived } from '../actions'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onopen = () => {
    console.log("Opened websocket for new user ", username);
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log("Got data on the socket: ", data.type);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.ADD_USER:
        dispatch(addUser(data.name))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      case types.NEW_GAME_EXISTS:
        console.log("Got a new open game from the socket!");
        dispatch(newGameReceived(data.game))
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket;