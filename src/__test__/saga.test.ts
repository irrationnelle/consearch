import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { mockConcerts } from '../__mock__/data';
import { retrieveConcerts } from '../api/concert';
import { mySaga } from '../sagas';

const { REACT_APP_DOMAIN_API_URL } = process.env;

const server = setupServer(
  rest.get(`${REACT_APP_DOMAIN_API_URL}/concerts`, (req, res, ctx) => res(ctx.json(mockConcerts))),
);

beforeEach(() => server.listen());

afterEach(() => server.close());

it('fetches concerts', () => {
  const concerts = mockConcerts;

  return expectSaga(mySaga)
    .put({ type: 'concerts/readSuccess', payload: { concerts } })
    .dispatch({ type: 'concerts/read' })
    .silentRun();
});

it('handles errors', () => {
  const error = new Error('Whoops');

  return expectSaga(mySaga)
    .provide([[call(retrieveConcerts), throwError(error)]])
    .put({ type: 'concerts/readFail', message: error })
    .dispatch({ type: 'concerts/read' })
    .run();
});
