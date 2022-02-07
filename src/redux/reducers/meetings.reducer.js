const meetingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEETINGS':
      return action.payload;
    case 'SET_SINGLE_MEETING':
      return action.payload;
    case 'CLEAR_MEETINGS':
      return [];
    default:
      return state;
  };
};

export default meetingsReducer;