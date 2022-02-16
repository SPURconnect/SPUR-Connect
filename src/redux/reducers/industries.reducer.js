const industriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_INDUSTRIES':
      return action.payload;
    default:
      return state;
  }
};

export default industriesReducer;