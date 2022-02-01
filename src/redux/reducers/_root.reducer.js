import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import userProfileReducer from './userProfile.reducer';
import searchProfilesReducer from './searchProfiles.reducer';
import industriesReducer from './industries.reducer';
import messagesReducer from './messages.reducer';
import whereReducer from './where.reducer';
import meetings from './meetings.reducer';
import notes from './notes.reducer';
import allProfilesReducer from './allProfiles.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userProfileReducer, 
  searchProfilesReducer,
  industriesReducer,
  messagesReducer,
  whereReducer,
  meetings, // contains users meetings
  notes, // contains notes for meetings
  allProfilesReducer, // contains all the profiles of users
});

export default rootReducer;
