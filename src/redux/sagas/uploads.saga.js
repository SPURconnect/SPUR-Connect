import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addPhoto(action){
  try{
    const headers = {
      'content-type': 'multipart/form-data'
    };
    const imageForm = new FormData();
    imageForm.append('image', action.payload.image);
    const response = yield axios({
      method: 'POST',
      url: `/api/uploads/${action.payload.id}`,
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
      url: `/api/uploads/${action.payload}`, //TODO: useParams
    })
    yield put({
      type: 'SET_PHOTOS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchPhotos catch error:', error);
  };
};

function* deletePhoto(action){
  try{
    const response = yield axios({
      method: 'DELETE',
      url: `/api/uploads/${action.payload.id}`,
    })
    yield put({
      type: 'FETCH_PHOTOS',
      payload: action.payload.paramsid
    })
  }catch(error){
    console.log('deletePhoto catch error:', error);
  };
};

function* uploadsSaga(){
  yield takeEvery('ADD_PHOTO', addPhoto);
  yield takeEvery('FETCH_PHOTOS', fetchPhotos);
  yield takeEvery('DELETE_PHOTO', deletePhoto);
};

export default uploadsSaga;