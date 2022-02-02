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

function* fetchNotes(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/meetings/notes/3`, //TODO: useParams
    })
    yield put({
      type: 'SET_NOTES',
      payload: response.data
    })
  }catch(error){
    console.log('fetchNotes catch error:', error);
  };
};

function* saveNotes(action){
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/meetings/notes/3`, //TODO: useParams
      data: action.payload
    })
    yield put({
      type: 'FETCH_NOTES',
      payload: response.data
    })
  }catch(error){
    console.log('saveNotes catch error:', error);
  };
};

function* editMeetingDetails(action){
  console.log('in action payload editMeeting details', action.payload);
  try{

    const response = yield axios({
      method: 'PUT',
      url: `/api/meetings/edit/${action.payload.id}`, //TODO: useParams
      data: action.payload
    })
    console.log('in response data editMeeting details',response.data);
    yield put({
      type: 'EDIT_MEETING_DETAILS',
      payload: response.data
    })
  }catch(error){
    console.log('EDIT_MEETING_DETAILS catch error:', error);
  };
};


function* meetingSaga(){
  yield takeEvery('ADD_MEETING', addMeeting);
  yield takeEvery('GET_MEETINGS', getMeetings);
  yield takeEvery('FETCH_NOTES', fetchNotes);
  yield takeEvery('SAVE_NOTES', saveNotes);
  yield takeEvery('EDIT_MEETING_DETAILS', editMeetingDetails);
};

export default meetingSaga;