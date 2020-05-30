import React from "react";
import ConcertList from "./concert-list";
import { render, fireEvent } from "./test-utils";

beforeAll(() => {
    global.kakao = jest.fn();
    global.kakao.maps = jest.fn();
    global.kakao.maps.LatLng = jest.fn();
    global.kakao.maps.Map = jest.fn();
    global.kakao.maps.services = jest.fn();
    global.kakao.maps.services.Geocoder = jest.fn();
    global.kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();
});

describe("concert", () => {
    it("back 버튼을 클릭하면 리스트로 돌아간다", () => {
        //given
        const { container, getByText } = render(<ConcertList />);

        fireEvent.click(getByText(/last live/i));

        //when
        fireEvent.click(getByText(/back/i));

        //then
        expect(container.innerHTML).toMatch("concert list");
    });
});
