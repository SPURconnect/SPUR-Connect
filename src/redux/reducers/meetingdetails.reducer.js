const meetingsDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_MEETING_DETAILS':
      return action.payload;
    default:
      return state;
  };
};

export default meetingsDetailsReducer;