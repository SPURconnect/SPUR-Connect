import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addPhoto(action){
  try{
    const headers = {
      'content-type': 'multipart/form-data'
    };
    const imageForm = new FormData();
    imageForm.append('image', action.payload);
    // imageForm.append('description', action.payload.imageDescription);
    console.log("addPhoto payload:", action.payload);
    const response = yield axios({
      method: 'POST',
      url: `/api/uploads`,
      headers: headers, 
      data: imageForm
    })
    yield put({
      type: 'FETCH_PHOTOS',
    })
  }catch(error){
    console.log('addPhoto catch error:', error);
  };
};

function* fetchPhotos(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/meetings/photos/${action.payload}`, //TODO: useParams
    })
    yield put({
      type: 'SET_PHOTOS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchPhotos catch error:', error);
  };
};

function* uploadsSaga(){
  yield takeEvery('ADD_PHOTO', addPhoto);
  yield takeEvery('FETCH_PHOTOS', fetchPhotos);
};

export default uploadsSaga;