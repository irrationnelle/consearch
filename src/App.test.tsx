import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

beforeAll(() => {
    (global as any).kakao = jest.fn();
    (global as any).kakao.maps = jest.fn();
    (global as any).kakao.maps.LatLng = jest.fn();
    (global as any).kakao.maps.Map = jest.fn();
    (global as any).kakao.maps.services = jest.fn();
    (global as any).kakao.maps.services.Geocoder = jest.fn();
    (global as any).kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();
});

test("full app rendering/navigating", () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
        <Router history={history}>
            <App />
        </Router>
    );
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(container.innerHTML).toMatch("main");

    fireEvent.click(getByText(/MyPage/i));

    // check that the content changed to the new page
    expect(container.innerHTML).toMatch("I'm rase");
});
