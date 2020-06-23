import { call, put, takeLatest } from "redux-saga/effects";

import { retrieveConcerts } from "./api/concert";
import { RawConcert } from "./@models/concert";

function* fetchConcerts() {
    try {
        const concerts: RawConcert[] = yield call(retrieveConcerts);
        yield put({ type: "REQ_CONCERTS_SUCCEEDED", payload: { concerts } });
    } catch (e) {
        yield put({ type: "REQ_CONCERTS_FAILED", message: e });
    }
}

function* mySaga() {
    yield takeLatest("REQ_CONCERTS", fetchConcerts);
}

export { mySaga, fetchConcerts };
