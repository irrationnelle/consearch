import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import { mocked } from "ts-jest/utils";
import axios from "axios";

import { retrieveConcerts } from "./api/concert";
import { mySaga } from "./sagas";
import { mockConcerts } from "./__mock__/data";

it("fetches concerts", () => {
    const id = 1;
    const concerts = mockConcerts;

    const mockGetRequest = jest.spyOn(axios, "get");
    mocked(mockGetRequest).mockResolvedValueOnce({ data: mockConcerts });

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
