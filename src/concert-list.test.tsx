import React from "react";
import ConcertList from "./concert-list";
import { render, fireEvent } from "./helpers/test-utils";

import { mockConcerts } from "./__mock__/data";
import { Concert } from "./@models/concert";

describe("concert list", () => {
    it("콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.", () => {
        //given
        const initialState: { concerts: Concert[] } = {
            concerts: mockConcerts
        };

        const { container, getByText } = render(<ConcertList />, {
            initialState
        });

        expect(container.innerHTML).toMatch("concert list");

        //when
        fireEvent.click(getByText(mockConcerts[0].title));

        //then
        expect(container.innerHTML).toMatch(mockConcerts[0].title);
    });

    it("콘서트 리스트에는 가격, 밴드이름, 밴드 장르, 시간표가 나타나야 한다.", () => {
        //given
        const initialState: { concerts: Concert[] } = {
            concerts: mockConcerts
        };

        //when
        const { container, getByText } = render(<ConcertList />, {
            initialState
        });

        //then
        expect(container.innerHTML).toMatch(mockConcerts[0].artist[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[0].artist[0].genre);
        expect(container.innerHTML).toMatch(mockConcerts[0].price.toString());
        expect(container.innerHTML).toMatch(mockConcerts[0].timetable);
    });
});
