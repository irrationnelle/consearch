import { fork, take, takeLatest } from 'redux-saga/effects'

import { mySaga, fetchConcerts } from './sagas'

const reqConcerts = () => ({
  type: "REQ_CONCERTS_2"
});


function* fetchSaga() {
  const action = yield take(reqConcerts);
}


test('fetch concerts', done => {
  const gen = mySaga();
    const expected = fork(takeLatest, 'REQ_CONCERTS', fetchConcerts)

    expect(gen.next().value).toMatchObject(takeLatest('REQ_CONCERTS', fetchConcerts));


    expect(gen.next().done).toEqual(true);

  done();
});
