import { call, put, takeLatest } from 'redux-saga/effects';

import { retrieveConcerts } from './api/concert';
import { RawConcert } from './@models/concert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* fetchConcerts() {
  try {
    const concerts: RawConcert[] = yield call(retrieveConcerts);
    yield put({ type: 'REQ_CONCERTS_SUCCEEDED', payload: { concerts } });
  } catch (e) {
    yield put({ type: 'REQ_CONCERTS_FAILED', message: e });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* mySaga() {
  yield takeLatest('REQ_CONCERTS', fetchConcerts);
}

export { mySaga, fetchConcerts };
