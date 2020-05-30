import { call, put, takeLatest } from "redux-saga/effects";

interface Concert {
    title: string;
    artist: string;
    address: string;
    price: number;
}

const api = (id: number) => {
    return [
        {
            id: 1,
            title: "behemoth",
            artist: "behemoth",
            price: 20000,
            address: "norway"
        },
        {
            id: 2,
            title: "shining",
            artist: "shining",
            price: 10000,
            address: "poland"
        }
    ];
};

function* fetchConcerts(action: any) {
    try {
        const concerts = yield call(api, action.payload);
        yield put({ type: "REQ_CONCERTS_SUCCEEDED", payload: { concerts } });
    } catch (e) {
        yield put({ type: "REQ_CONCERTS_FAILED", message: e });
    }
}

function* mySaga() {
    yield takeLatest("REQ_CONCERTS", fetchConcerts);
}

export { mySaga, fetchConcerts, api };
