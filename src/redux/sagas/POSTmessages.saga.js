import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
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

function* messagesPOST() {
  yield takeLatest('POST_MESSAGE', postMessage);
}

export default messagesPOST;