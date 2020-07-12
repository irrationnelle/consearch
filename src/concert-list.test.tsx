import React from "react";
import ConcertList from "./concert-list";
import { render, fireEvent } from "./helpers/test-utils";

import { mockConcerts } from "./__mock__/data";
import { RawConcert } from "./@models/concert";
import {format, parseISO} from "date-fns";

describe("concert list", () => {
    it("콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.", () => {
        //given
        const initialState: { concerts: RawConcert[] } = {
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
        const initialState: { concerts: RawConcert[] } = {
            concerts: mockConcerts
        };

        //when
        const { container } = render(<ConcertList />, {
            initialState
        });

        //then
        expect(container.innerHTML).toMatch(mockConcerts[0].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[0].artists[0].genre);
        expect(container.innerHTML).toMatch(mockConcerts[0].price.toString());

        const rawTimetable = mockConcerts[0].timetable;
        const parsedTimetable = parseISO(rawTimetable);
        const expectedTime: string = format(parsedTimetable, "HH:mma");
        const expectedDate: string = format(parsedTimetable, "yyyy-MM-dd");

        expect(container.innerHTML).toMatch(expectedTime);
        expect(container.innerHTML).toMatch(expectedDate);
    });

    it("콘서트 리스트에 옵션을 추가해서 조건에 맞는 콘서트 목록만을 남긴다", () => {
        //given
        const initialState: { concerts: RawConcert[] } = {
            concerts: mockConcerts
        };
        const { container, getByLabelText } = render(<ConcertList />, {
            initialState
        });

        const input = getByLabelText("concert-genre");


        // when
        fireEvent.change(input, { target: { value: "Metalcore"}})

        //then
        expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
        expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[3].artists[0].name);
    })

    it("콘서트 목록에 2개 이상의 옵션을 추가해서 조건에 맞는 콘서트 목록만을 남긴다", () => {
        //given
        const initialState: { concerts: RawConcert[] } = {
            concerts: mockConcerts
        };
        const { container, getByLabelText } = render(<ConcertList />, {
            initialState
        });

        const input = getByLabelText("concert-genre");


        // when
        fireEvent.change(input, { target: { value: "Metalcore"}})
        fireEvent.change(input, { target: { value: "PostMetal"}})

        //then
        expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
        expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[3].artists[0].name);
        expect(container.innerHTML).toMatch(mockConcerts[4].artists[0].name);
    })
});
