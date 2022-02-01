const allProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PROFILES':
      return action.payload;
    default:
      return state;
  };
};

export default allProfilesReducer;