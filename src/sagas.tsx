import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const api = (id: number) => { return [{ id: 1, title: 'behemoth', price: 20000, address: 'norway' }, {id: 2, title: 'shining', price: 10000, address: "poland"}]}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchConcerts(action: any) {
   const fetch = (userId: string) => {console.log(userId)}

   try {
      const concerts = yield call(api, action.payload);
      yield put({type: "REQ_CONCERTS_SUCCEEDED", payload: concerts});
   } catch (e) {
      yield put({type: "REQ_CONCERTS_FAILED", message: e});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeLatest("REQ_CONCERTS", fetchConcerts);
}


export { mySaga, fetchConcerts, api };
