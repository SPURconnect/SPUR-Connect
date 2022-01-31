const searchProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return action.payload;
    case 'CLEAR_PROFILES':
      return [];
    case 'SORT_BY_INDUSTRY':
      let newState = [...state];
      let filteredSearch = newState.filter(industry => industry.industry_id == event.target.value);
    for (let i = 0; i < filteredSearch.length; i++) {
      let index = newState.indexOf(filteredSearch[i]);
      newState.splice(index, 1);
      newState.unshift(filteredSearch[i]);
    }
      return newState;
    default:
      return state;
  }
};


export default searchProfilesReducer;