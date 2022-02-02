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
function* fetchSingleProfile(action) {
  console.log(action.payload)
  try {
    const singleProfile = yield axios({
      method: "GET",
      url: `/api/singleProfile/${action.payload}`,
    });
    yield put({ type: "SET_SINGLE_PROFILE", payload: singleProfile.data });
  } catch (err) {
    console.log("GET fetchSingleProfile error", err);
  }
}


function* searchProfilesSaga() {
  yield takeEvery("FETCH_PROFILES", fetchProfiles);
  yield takeEvery("FETCH_ALL_PROFILES", fetchAllProfiles);
  yield takeEvery('FETCH_SINGLE_PROFILE', fetchSingleProfile)
}

export default searchProfilesSaga;