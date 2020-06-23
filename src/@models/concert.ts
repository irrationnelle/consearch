export interface RawConcert {
    id: number;
    artist: {
        name: string;
        genre: string;
    }[];
    title: string;
    address: string;
    price: number;
    timetable: string;
}

export interface Concert {
    id: number;
    artist: {
        name: string;
        genre: string;
    }[];
    title: string;
    address: string;
    price: number;
    time: string;
    date: string;
}
