interface ConcertWithoutTime {
    id: number;
    artist: {
        name: string;
        genre: string;
    }[];
    title: string;
    address: string;
    price: number;
}

export interface RawConcert extends ConcertWithoutTime{
    timetable: string;
}

export interface Concert extends ConcertWithoutTime{
    time: string;
    date: string;
}
