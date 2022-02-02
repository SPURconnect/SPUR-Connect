const singleProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SINGLE_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

export default singleProfileReducer;