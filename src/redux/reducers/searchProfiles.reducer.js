const searchProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return action.payload;
    case 'CLEAR_PROFILES':
      return [];
    case 'SORT_BY_INDUSTRY':
      return action.payload;
    default:
      return state;
  }
};


export default searchProfilesReducer;