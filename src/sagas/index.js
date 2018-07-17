import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

export const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username
    params.socket.send(JSON.stringify(action))
  })
}


export const createNewGame = function* createNewGame(params) {
  console.log("Beginning saga for new game.");
  yield takeEvery(types.CREATE_GAME, (action) => {
    console.log("Carrying out saga for createNewGame.");
    params.socket.send(JSON.stringify(action))
  })
}