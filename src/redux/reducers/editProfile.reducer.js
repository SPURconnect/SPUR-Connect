const editProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EDIT_PROFILE':
      return action.payload;
    default:
      return state;
  }
}

export default editProfileReducer;