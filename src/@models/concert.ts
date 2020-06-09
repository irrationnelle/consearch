export interface Concert {
    id: number;
    artist: {
        name: string;
        genre: string;
    };
    title: string;
    address: string;
    price: number;
    timetable: string;
}
