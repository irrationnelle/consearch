import { call, put, takeLatest } from "redux-saga/effects";

import { retrieveConcerts } from "./api/concert";

interface Concert {
    title: string;
    artist: string;
    address: string;
    price: number;
}

function* fetchConcerts(action: any) {
    try {
        console.log(action);
        const concerts = yield call(retrieveConcerts, action.payload.id);
        yield put({ type: "REQ_CONCERTS_SUCCEEDED", payload: { concerts } });
    } catch (e) {
        yield put({ type: "REQ_CONCERTS_FAILED", message: e });
    }
}

function* mySaga() {
    yield takeLatest("REQ_CONCERTS", fetchConcerts);
}

export { mySaga, fetchConcerts };
