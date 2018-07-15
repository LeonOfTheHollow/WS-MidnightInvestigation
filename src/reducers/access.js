import * as types from "../constants/ActionTypes";

let initialState = {
  authed: false,
}

const access = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.log("Logged in.");
      state.authed = true;
      return {
        ...state,
        authed: true,
        currentUser: action.payload.data,
      };
    case types.LOGIN_FAILURE:
      console.log("Failed to log in...");
      return state;
    default:
      return state;
  }
}

export default access;