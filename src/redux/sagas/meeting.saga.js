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

function* getSingleMeeting(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/meetings/${action.payload}`,
    })
    yield put({
      type: 'SET_MEETING_DETAIL',
      payload: response.data
    })
  }catch(error){
    console.log('getMeetings catch error:', error);
  };
};

function* deleteMeeting(action){
  try{
    yield axios({
      method: 'DELETE',
      url: '/api/meetings',
      data: action.payload,
    })
    yield put({
      type: 'GET_MEETINGS'
    })
  } catch(error){
    console.log('deleteMeeting catch error:', error);
  }
}

function* fetchNotes(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/meetings/notes/${action.payload}`,
    })
    yield put({
      type: 'SET_NOTES',
      payload: response.data.meeting_notes
    })
  }catch(error){
    console.log('fetchNotes catch error:', error);
  };
};

function* saveNotes(action){
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/meetings/notes/${action.payload.id}`, 
      data: action.payload
    })
    yield put({
      type: 'FETCH_NOTES',
      payload: response.data.id
    })
  }catch(error){
    console.log('saveNotes catch error:', error);
  };
};

function* meetingSaga(){
  yield takeEvery('ADD_MEETING', addMeeting);
  yield takeEvery('GET_MEETINGS', getMeetings);
  yield takeEvery('FETCH_NOTES', fetchNotes);
  yield takeEvery('SAVE_NOTES', saveNotes);
  yield takeEvery('DELETE_MEETING', deleteMeeting);
  yield takeEvery('GET_SINGLE_MEETING', getSingleMeeting);
};

export default meetingSaga;