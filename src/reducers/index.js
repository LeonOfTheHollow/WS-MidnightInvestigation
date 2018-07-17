import { combineReducers } from "redux";
import messages from "./messages";
import users from "./users";
import access from "./access";
import games from "./games";

const chat = combineReducers({
  messages,
  users,
  access,
  games
});

export default chat;