import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchIndustries() {
  try {
    const industries = yield axios({
      method: 'GET',
      url: `/api/industry`
    });
    yield put({ type: 'SET_INDUSTRIES', payload: industries.data });
  } catch (err) {
    console.log('GET INDUSTRIES error', err);
  }
}

function* industrySaga() {
  yield takeEvery('FETCH_INDUSTRIES', fetchIndustries);
}

export default industrySaga;