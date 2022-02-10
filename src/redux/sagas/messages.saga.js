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

function* postMessage(action) {
  try {
    const response = yield axios({
      method: "POST",
      url: '/api/messages',
      data: action.payload,
    })
    yield put({
      type: "FETCH_MESSAGES"
    });

  } catch(error) {
    console.log('Error fetching Messages from DB', error);
  }
}

function* messagesSaga() {
  yield takeLatest('FETCH_MESSAGES', getMessages);
  yield takeLatest('POST_MESSAGE', postMessage);
}

export default messagesSaga;
