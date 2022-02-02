import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addPhoto(action){
  try{
    console.log(action.payload);
    const response = yield axios({
      method: 'POST',
      url: `/api/uploads`, 
      data: {url: action.payload}
    })
    yield put({
      type: 'FETCH_PHOTOS',
    })
  }catch(error){
    console.log('addPhoto catch error:', error);
  };
};

function* uploadsSaga(){
  yield takeEvery('ADD_PHOTO', addPhoto);
};

export default uploadsSaga;