import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* fetchMeetingDetails(action){
  console.log('in action payload fetchMeetingDetails ', action.payload);
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/meetings/edit/${action.payload}`,
    })
    console.log('********', response.data);
    yield put({
      type: 'SET_MEETING_DETAIL',
      payload: response.data
    })
  }catch(error){
    console.log('fetchMeetingDetails catch error:', error);
  };
};


function* saveMeetingDetails(action){
  console.log('in action payload saveMeetingDetails ', action.payload);
  try{

   yield axios({
      method: 'PUT',
      url: `/api/meetings/edit/${action.payload.id}`, 
      data: action.payload
    })
  
    yield put({
      type: 'FETCH_MEETING_DETAILS',
      payload: action.payload.id
    })
  }catch(error){
    console.log('EDIT_MEETING_DETAILS catch error:', error);
  };
};


function* meetingDetailsSaga(){
  yield takeEvery('FETCH_MEETING_DETAILS', fetchMeetingDetails);
  yield takeEvery('SAVE_MEETING_DETAILS', saveMeetingDetails);

};

export default meetingDetailsSaga;