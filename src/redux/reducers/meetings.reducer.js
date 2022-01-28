const meetingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEETINGS':
      return action.payload;
    default:
      return state;
  };
};

export default meetingsReducer;