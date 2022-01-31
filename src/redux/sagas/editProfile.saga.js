import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProfileToEdit(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/editProfile/${action.payload}`
    })
    const editProfile= response.data;
    yield put({
      type: 'SET_EDIT_PROFILE',
      payload: editProfile
    })
    console.log('in fetchUserProfileToEdit saga response.data', editProfile);
    
  } catch (err) {
    console.log('in fetchUserProfileToEdit saga error', err);
  }
}

function* editProfileInfo(action) {
  try {
    console.log('in editProfileInfo action.payload', action.payload)
    yield axios({
      method: 'PUT',
      url: `/api/editProfile/${action.payload.id}`,
      data: action.payload
    })
    yield put({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT',
      payload: action.payload.id
    })
  } catch (err) {
    console.log('in editProfileInfo saga err',err )
  }
} 


function* editProfileSaga() {
  yield takeLatest('SAGA_FETCH_PROFILE_TO_EDIT', fetchProfileToEdit),
  yield takeLatest('SAGA_EDIT_PROFILE_INFO', editProfileInfo )
}
export default editProfileSaga;