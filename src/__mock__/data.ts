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
    },
    {
        id: 3,
        artists: [{
            name: "Lamb of god",
            genre: "Metalcore"
        }],
        timetable: "2020-07-10T20:00:00+09:00",
        title: "Lamb of god",
        price: 30000,
        address: "Conne Island, Koburger Str. 3, 04277 Leipzig"
    },
    {
        id: 4,
        artists: [{
            name: "Killswitch engage",
            genre: "Metalcore"
        }],
        timetable: "2020-07-17T20:00:00+09:00",
        title: "Killswitch engage",
        price: 20000,
        address: "Kensington Gore, South Kensington, London"
    },
    {
        id: 5,
        artists: [{
            name: "Amenra",
            genre: "PostMetal"
        }],
        timetable: "2020-07-13T20:00:00+09:00",
        title: "Amenra",
        price: 10000,
        address: "서울특별시 마포구 서교동 홍익로 25"
    }
];

export { mockConcerts };
