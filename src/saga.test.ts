import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from 'redux-saga/effects'

import { mySaga, api } from './sagas'

it("fetches concerts", () => {
  const id = 42;
  const user = { id, name: "Jeremy" };
  const user2 = { id, name: "Henry" };

  return expectSaga(mySaga)
    //.provide([[call(api, id), user]])
    .put({ type: "REQ_CONCERTS_SUCCEEDED", payload: user })
    .dispatch({ type: "REQ_CONCERTS", payload: id })
    .silentRun();
}); 

it("handles errors", () => {
  const id = 42;
  const error = new Error("Whoops");

  return expectSaga(mySaga)
    .provide([[call(api, id), throwError(error)]])
    .put({ type: "REQ_CONCERTS_FAILED", message: error })
    .dispatch({ type: "REQ_CONCERTS", payload: id })
    .run();
});
