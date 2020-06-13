import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import { mocked } from "ts-jest/utils";
import axios from "axios";

import { retrieveConcerts } from "./api/concert";
import { mySaga } from "./sagas";
import { mockConcerts } from "./__mock__/data";

import { rest } from "msw";
import { setupServer } from "msw/node";

const { REACT_APP_DOMAIN_API_URL } = process.env;

const server = setupServer(
    rest.get(`${REACT_APP_DOMAIN_API_URL}/concerts`, (req, res, ctx) => {
        return res(ctx.json(mockConcerts));
    })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

it("fetches concerts", () => {
    const concerts = mockConcerts;

    //const mockGetRequest = jest.spyOn(axios, "get");
    //mocked(mockGetRequest).mockResolvedValueOnce({ data: mockConcerts });

    return expectSaga(mySaga)
        .put({ type: "REQ_CONCERTS_SUCCEEDED", payload: { concerts } })
        .dispatch({ type: "REQ_CONCERTS" })
        .silentRun();
});

it("handles errors", () => {
    const error = new Error("Whoops");

    return expectSaga(mySaga)
        .provide([[call(retrieveConcerts), throwError(error)]])
        .put({ type: "REQ_CONCERTS_FAILED", message: error })
        .dispatch({ type: "REQ_CONCERTS" })
        .run();
});
