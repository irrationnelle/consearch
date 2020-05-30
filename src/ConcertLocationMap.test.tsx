import React from "react";
import { render } from "@testing-library/react";

import ConcertLocationMap from "./ConcertLocationMap";

beforeAll(() => {
    global.kakao = jest.fn();
    global.kakao.maps = jest.fn();
    global.kakao.maps.LatLng = jest.fn();
    global.kakao.maps.Map = jest.fn();
    global.kakao.maps.services = jest.fn();
    global.kakao.maps.services.Geocoder = jest.fn();
    global.kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();
});

test("renders concert list component", () => {
    const component = render(
        <ConcertLocationMap points={{ x: 1, y: 2 }} address={"test"} />
    );
    expect(component).not.toBeNull();
});
