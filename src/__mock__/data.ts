import { Concert } from "../@models/concert";
import { format } from 'date-fns';

const mockConcerts: Concert[] = [
    {
        id: 1,
        artist: {
            name: "behemoth",
            genre: "blackmetal"
        },
        timetable: format(new Date(2020, 5, 24), 'yyyy-MM-dd'),
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
        timetable: format(new Date(2020, 9, 24), 'yyyy-MM-dd'),
        title: "shining",
        price: 10000,
        address: "poland"
    }
];

export { mockConcerts };
