const messages = (state = [], action) => {
  console.log("The reducer received an action: ", action.type);
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id
        }
      ])
    default:
      return state;
  }
}

export default messages;