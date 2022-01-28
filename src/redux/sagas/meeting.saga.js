import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addMeeting(action){
  try{
    const response = yield axios({
      method: 'POST',
      url: '/api/meetings',
      data: action.payload
    })
    yield put({
      type: 'GET_MEETINGS'
    })
  }catch(error){
    console.log('addMeeting catch error:', error);
  };
};

function* getMeetings(){
  try{
    const response = yield axios({
      method: 'GET',
      url: '/api/meetings',
    })
    yield put({
      type: 'SET_MEETINGS',
      payload: response.data
    })
  }catch(error){
    console.log('getMeetings catch error:', error);
  };
};

function* meetingSaga(){
  yield takeEvery('ADD_MEETING', addMeeting);
  yield takeEvery('GET_MEETINGS', getMeetings)
};

export default meetingSaga;