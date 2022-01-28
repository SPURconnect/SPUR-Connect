import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* getMessages() {
  try {
    const response = yield axios({
      method: "GET",
      url: '/api/messages'
    })
    yield put({
      type: "SET_MESSAGES",
      payload: response.data
    });

  } catch(error) {
    console.log('Error fetching Messages from DB', error);
  }
}

function* messagesGET() {
  yield takeLatest('FETCH_MESSAGES', getMessages);
}

export default messagesGET;
