const searchProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return action.payload;
    case 'CLEAR_PROFILES':
      return [];
    case 'SORT_BY_INDUSTRY':
      let newState = [...state];
      let filteredSearch = newState.filter(industry => industry.industry_id == event.target.value);
      return filteredSearch;
    default:
      return state;
  }
};


export default searchProfilesReducer;