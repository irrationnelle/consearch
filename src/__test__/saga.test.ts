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

beforeAll(() => server.listen());

afterAll(() => server.close());

it('fetches concerts', () => {
  const concerts = mockConcerts;

  return expectSaga(mySaga)
    .put({ type: 'REQ_CONCERTS_SUCCEEDED', payload: { concerts } })
    .dispatch({ type: 'REQ_CONCERTS' })
    .silentRun();
});

it('handles errors', () => {
  const error = new Error('Whoops');

  return expectSaga(mySaga)
    .provide([[call(retrieveConcerts), throwError(error)]])
    .put({ type: 'REQ_CONCERTS_FAILED', message: error })
    .dispatch({ type: 'REQ_CONCERTS' })
    .run();
});
