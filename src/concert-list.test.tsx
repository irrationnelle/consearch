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
});
