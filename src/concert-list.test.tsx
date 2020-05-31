import React from "react";
import ConcertList from "./concert-list";
import { render, fireEvent } from "./helpers/test-utils";

interface Concert {
    id: number;
    title: string;
    artist: string;
    address: string;
    price: number;
}

describe("concert list", () => {
    it("콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.", () => {
        //given
        const initialState: { concerts: Concert[] } = {
            concerts: [
                {
                    id: 1,
                    title: "behemoth and niklas",
                    artist: "behemoth",
                    address: "poland",
                    price: 10000
                },
                {
                    id: 2,
                    title: "leprous",
                    artist: "leprous",
                    address: "norway",
                    price: 30000
                }
            ]
        };

        const { container, getByText } = render(<ConcertList />, {
            initialState
        });

        expect(container.innerHTML).toMatch("concert list");

        //when
        fireEvent.click(getByText(/leprous/i));

        //then
        expect(container.innerHTML).toMatch("leprous");
    });
});
