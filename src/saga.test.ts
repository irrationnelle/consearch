import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import deepEqual from 'deep-equal';

const reqConcerts = () => ({
  type: "REQ_CONCERTS"
});

const fetchConcerts = (concerts) => ({type: "REQ_CONCERTS_SUCCEEDED", payload: concerts});


function* fetchSaga() {
  const action = yield take("REQ_CONCERTS");
}

test('change color saga', assert => {
  const gen = fetchSaga();

  deepEqual(
    gen.next().value,
    take(reqConcerts),
    'it should wait for a user to choose a color'
  );

  deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );
});
