import axios from "axios";
import { Concert } from "../@models/concert";
import { mockConcerts } from "../__mock__/data";

const retrieveConcerts = async (): Promise<Concert[]> => {
    if (process.env.REACT_APP_DEV) {
        const result = await Promise.resolve(mockConcerts);
        return result;
    }
    const { data } = await axios.get("fakeUrl.dev/concerts");
    return data;
};

export { retrieveConcerts };
