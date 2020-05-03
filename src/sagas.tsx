import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action: any) {
    const fetchUser = (userId: string) => {console.log(userId)}

   try {
       console.log('this is saga');
       console.log('%caction in saga: ', 'background: white; color: black;', action);
      //const user = yield call(fetchUser, action.payload);
      yield put({type: "USER_FETCH_SUCCEEDED", user: action.payload});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}


export default mySaga;
