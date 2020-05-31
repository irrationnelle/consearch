import axios from "axios";

const retrieveConcerts = async (id: number) => {
    if (process.env.REACT_APP_DEV) {
        return [
            {
                id: 1,
                title: "behemoth",
                artist: "behemoth",
                price: 20000,
                address: "norway"
            },
            {
                id: 2,
                title: "shining",
                artist: "shining",
                price: 10000,
                address: "poland"
            }
        ];
    }
    const { data } = await axios.get(`fakeUrl.dev/concerts/${id}`);
    return data;
};

export { retrieveConcerts };
