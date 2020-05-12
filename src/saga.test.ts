import { expectSaga } from "redux-saga-test-plan";
import { call } from 'redux-saga/effects'

import { mySaga, api } from './sagas'

it("fetches concerts", () => {
  const id = 42;
  const user = { id, name: "Jeremy" };

  return expectSaga(mySaga)
    .provide([[call(api, id), user]])
    .put({ type: "REQ_CONCERTS_SUCCEEDED", payload: user })
    .dispatch({ type: "REQ_CONCERTS", payload: id })
    .silentRun();
}); 
