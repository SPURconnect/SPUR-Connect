import { all } from 'redux-saga/effects';
import industriesSaga from './industries.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import searchProfilesSaga from './searchProfiles.saga';
import userSaga from './user.saga';
import userProfile from './userProfile.saga';
import messagesSaga from './messages.saga';
import meetingSaga from './meeting.saga';
import editProfileSaga from './editProfile.saga';
import uploadsSaga from './uploads.saga';
import meetingDetailsSaga from './meetingDetails.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    userProfile(), // This is to grab the users profile information
    editProfileSaga(), // This is to edit the user profiles
    searchProfilesSaga(),
    industriesSaga(),
    messagesSaga(),
    meetingSaga(), // saga for meetings
    uploadsSaga(), 
    meetingDetailsSaga(),
  ]);
}
