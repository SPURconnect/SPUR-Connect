import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchUserProfile() {
  try {
    
    const response = yield axios({
      method: 'GET',
      url: '/api/userProfile'
    })
    yield put({
      type: 'SET_USER_PROFILE',
      payload: response.data
    })
    console.log('in fetchUserProfile', response.data);
  } catch (err) {
    console.log('in GET fetchUserProfile error', err);
  }
}





function* userProfile() {
  yield takeLatest('SAGA_FETCH_USER_PROFILES', fetchUserProfile )
  
};

export default userProfile;