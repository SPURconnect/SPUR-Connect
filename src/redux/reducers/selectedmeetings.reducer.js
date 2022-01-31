const selectmeetingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_MEETINGSS':
      return action.payload;
    default:
      return state;
  };
};

export default selectmeetingsReducer;