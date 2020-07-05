import { RawConcert } from "../@models/concert";

const mockConcerts: RawConcert[] = [
    {
        id: 1,
        artists: [{
            name: "Behemoth",
            genre: "BlackMetal"
        }],
        timetable: "2020-06-21T21:30:00+09:00",
        title: "Behemoth",
        price: 20000,
        address: "Mariboes gate 3-5, 0179 Oslo, Norway"
    },
    {
        id: 2,
        artists: [{
            name: "Shining",
            genre: "SuicidalBlackMetal"
        }],
        timetable: "2020-07-06T20:00:00+09:00",
        title: "Shining",
        price: 15000,
        address: "Stanisława Noakowskiego 16, 00-666 Warszawa, Poland"
    }
];

export { mockConcerts };
