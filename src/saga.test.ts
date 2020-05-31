import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";

import { retrieveConcerts } from "./api/concert";
import { mySaga } from "./sagas";

it("fetches concerts", () => {
    const id = 1;
    const concerts = [
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

    return (
        expectSaga(mySaga)
            //.provide([[call(api, id), user]])
            .put({ type: "REQ_CONCERTS_SUCCEEDED", payload: { concerts } })
            .dispatch({ type: "REQ_CONCERTS", payload: { id } })
            .silentRun()
    );
});

it("handles errors", () => {
    const id = 2;
    const error = new Error("Whoops");

    return expectSaga(mySaga)
        .provide([[call(retrieveConcerts, id), throwError(error)]])
        .put({ type: "REQ_CONCERTS_FAILED", message: error })
        .dispatch({ type: "REQ_CONCERTS", payload: { id } })
        .run();
});
