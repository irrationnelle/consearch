import axios from 'axios';

import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { RawConcert } from '../@models/concert';
import { mockConcerts } from '../__mock__/data';
import { ConcertProperty } from '../InputData';

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

const createConcert = async (newConcert: ConcertProperty): Promise<ConcertProperty> => {
  const db = getFirestore();
  await addDoc(collection(db, 'concerts'), newConcert);
  return newConcert;
};

export { retrieveConcerts, retrieveConcert, createConcert };
