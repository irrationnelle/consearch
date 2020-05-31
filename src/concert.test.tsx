import React from "react";
import ConcertList from "./concert-list";
import { render, fireEvent } from "./helpers/test-utils";

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
