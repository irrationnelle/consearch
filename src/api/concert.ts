import axios from 'axios';

import { RawConcert } from '../@models/concert';
import { mockConcerts } from '../__mock__/data';

const { REACT_APP_DOMAIN_API_URL } = process.env;

const retrieveConcerts = async (): Promise<RawConcert[]> => {
  if (process.env.REACT_APP_DEV) {
    return mockConcerts;
  }
  const { data } = await axios.get(`${REACT_APP_DOMAIN_API_URL}/concerts`);
  return data;
};

const retrieveConcert = async (id: number): Promise<RawConcert> => {
  if (process.env.REACT_APP_DEV) {
    return mockConcerts[0];
  }
  const { data } = await axios.get(
    `${REACT_APP_DOMAIN_API_URL}/concerts/${id}`,
  );
  return data;
};

export { retrieveConcerts, retrieveConcert };
