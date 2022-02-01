import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchProfiles(action) {
    let search = { input: action.payload };
    try {
        const profiles = yield axios({
          method: 'GET',
          url: `/api/searchProfiles/${search.input}`
        });
        
        yield put({ type: 'SET_PROFILES', payload: profiles.data });

    } catch (err) {
        console.log('GET Profiles error', err);
    }
}

function* fetchAllProfiles(action) {
  let search = { input: action.payload };
  try {
      const profiles = yield axios({
        method: 'GET',
        url: `/api/searchProfiles`
      });
      
      yield put({ type: 'SET_ALL_PROFILES', payload: profiles.data });

  } catch (err) {
      console.log('GET Profiles error', err);
  }
}

function* searchProfilesSaga() {
  yield takeEvery('FETCH_PROFILES', fetchProfiles);
  yield takeEvery('FETCH_ALL_PROFILES', fetchAllProfiles);
}

export default searchProfilesSaga;