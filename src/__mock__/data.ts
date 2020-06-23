import { Concert } from "../@models/concert";
import { format } from "date-fns";

const mockConcerts: Concert[] = [
    {
        id: 1,
        artist: [{
            name: "behemoth",
            genre: "blackmetal"
        }],
        timetable: "2020-06-21T21:30:00+09:00",
        title: "behemoth",
        price: 20000,
        address: "norway"
    },
    {
        id: 2,
        artist: [{
            name: "shining",
            genre: "blackmetal"
        }],
        timetable: "2020-06-23T23:30:00+09:00",
        title: "shining",
        price: 10000,
        address: "poland"
    }
];

export { mockConcerts };
