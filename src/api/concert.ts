import axios from 'axios';
import {
  addDoc, collection, getFirestore, getDocs, where, query,
} from 'firebase/firestore';
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
  try {
    const db = getFirestore();
    await addDoc(collection(db, 'concerts'), newConcert);
    return newConcert;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      title: '에러',
      artist: '에러',
      stage: '에러',
      address: '에러',
      genre: '에러',
      date: '에러',
    };
  }
};

const readConcertApi = async (): Promise<ConcertProperty[]> => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'concerts'));
    return querySnapshot.docs.map((currentDoc) => currentDoc.data() as ConcertProperty);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const readSingleConcertApiByTitle = async (title: string): Promise<ConcertProperty[]> => {
  try {
    const db = getFirestore();
    const queryForConcert = await query(collection(db, 'concerts'), where('title', '==', title));
    const querySnapshot = await getDocs(queryForConcert);
    return querySnapshot.docs.map((currentDoc) => currentDoc.data() as ConcertProperty);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

export {
  retrieveConcerts, retrieveConcert, createConcert, readConcertApi, readSingleConcertApiByTitle,
};
