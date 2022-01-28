const searchProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return action.payload;
    case 'CLEAR_PROFILES':
      return [];
    default:
      return state;
  }
};


export default searchProfilesReducer;