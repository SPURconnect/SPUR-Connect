import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* getSelectedMeetings(){
  try{
    const response = yield axios({
      method: 'GET',
      url: '/api/selectedmeetings',
    })
    yield put({
      type: 'SET_SELECTED_MEETINGS',
      payload: response.data
    })
  }catch(error){
    console.log('getSelectedMeetings catch error:', error);
  };
};



function* selectedmeetingSaga(){
  yield takeEvery('GET_SELECTED_MEETINGS', getSelectedMeetings);
  
};

export default selectedmeetingSaga;