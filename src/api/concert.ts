import axios from "axios";
import { Concert } from "../@models/concert";
import { mockConcerts } from "../__mock__/data";

const { REACT_APP_DOMAIN_API_URL } = process.env;

const retrieveConcerts = async (): Promise<Concert[]> => {
    if (process.env.REACT_APP_DEV) {
        const result = await Promise.resolve(mockConcerts);
        return result;
    }

    console.log("REACT_APP_DOMAIN_API_URL: ", REACT_APP_DOMAIN_API_URL);
    const { data } = await axios.get(`${REACT_APP_DOMAIN_API_URL}/concerts`);
    return data;
};

const retrieveConcert = async (id: number): Promise<Concert> => {
    if (process.env.REACT_APP_DEV) {
        const result = await Promise.resolve(mockConcerts[0]);
        return result;
    }
    const { data } = await axios.get(
        `${REACT_APP_DOMAIN_API_URL}/concerts/${id}`
    );
    return data;
};

export { retrieveConcerts, retrieveConcert };
