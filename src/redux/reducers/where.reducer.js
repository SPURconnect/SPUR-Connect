// keeps track of where the user is in the app by the hash in the url
const whereReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WHERE':
      return action.payload;
    default:
      return state;
  }
};

export default whereReducer;