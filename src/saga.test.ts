const reqConcerts = () => ({
  type: "REQ_CONCERTS"
});

const fetchConcerts = (concerts) => ({type: "REQ_CONCERTS_SUCCEEDED", payload: concerts});


function* fetchSaga() {
  const action = yield take("REQ_CONCERTS");
  yield put(fetchConcerts(action.payload.color));
}

test('change color saga', assert => {
  const gen = fetchSaga();

  assert.deepEqual(
    gen.next().value,
    take(CHOOSE_COLOR),
    'it should wait for a user to choose a color'
  );

  const color = 'red';
  assert.deepEqual(
    gen.next(chooseColor(color)).value,
    put(changeUI(color)),
    'it should dispatch an action to change the ui'
  );

  assert.deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );

  assert.end();
});
