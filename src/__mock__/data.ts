import { Concert } from "../@models/concert";

const mockConcerts: Concert[] = [
    {
        id: 1,
        artist: {
            name: "behemoth",
            genre: "blackmetal"
        },
        timetable: "2020-06-10",
        title: "behemoth",
        price: 20000,
        address: "norway"
    },
    {
        id: 2,
        artist: {
            name: "shining",
            genre: "blackmetal"
        },
        timetable: "2020-09-23",
        title: "shining",
        price: 10000,
        address: "poland"
    }
];

export { mockConcerts };
