import { fork, take, takeLatest } from 'redux-saga/effects'

import { mySaga, fetchConcerts } from './sagas'

test('fetch concerts', done => {
  const gen = mySaga();
    const expected = fork(takeLatest, 'REQ_CONCERTS', fetchConcerts)

    expect(gen.next().value).toEqual(takeLatest('REQ_CONCERTS', fetchConcerts));

    expect(gen.next().done).toEqual(true);

  done();
});
