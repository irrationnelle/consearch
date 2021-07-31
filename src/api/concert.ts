import axios from 'axios';
import {
  addDoc, collection, getFirestore, getDocs, where, query, documentId, updateDoc, arrayUnion, doc,
} from 'firebase/firestore';
import algoliasearch from 'algoliasearch';
import { RawConcert } from '../@models/concert';
import { mockConcerts } from '../__mock__/data';
import { ConcertProperty } from '../InputData';
import { ArtistProperty } from '../ArtistInputData';

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
    const docRef = await addDoc(collection(db, 'concerts'), newConcert);
    if (newConcert.artists.length > 0) {
      for (const artistToUpdate of newConcert.artists) {
        if (artistToUpdate) {
          const updateDocRef = doc(db, 'artists', artistToUpdate);
          updateDoc(updateDocRef, {
            concerts: arrayUnion(docRef.id),
          });
        }
      }
    }
    return newConcert;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      title: '에러',
      artists: ['에러'],
      stage: '에러',
      address: '에러',
      genre: '에러',
      date: '에러',
      price: -1,
    };
  }
};

const readConcertApi = async (): Promise<ConcertProperty[]> => {
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'concerts'));
    return querySnapshot.docs.map((currentDoc) => {
      const data = currentDoc.data();
      const result = {
        ...data,
        id: currentDoc.id,
      };
      return result as ConcertProperty;
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const ALGOLIA_APP_ID: string = process.env.REACT_APP_ALGOLIA_APP_ID as string;
const ALGOLIA_API_KEY: string = process.env.REACT_APP_ALGOLIA_API_KEY as string;
const ALGOLIA_INDEX_NAME: string = process.env.REACT_APP_ALGOLIA_INDEX as string;

const readSingleConcertApiByTitle = async (title: string): Promise<ConcertProperty[]> => {
  try {
    const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX_NAME);
    const { hits: searchResults } = await algoliaIndex.search(title);
    if (searchResults.length <= 0) return [];
    const concertObjectIds = searchResults.map((searchResult) => searchResult.objectID);
    return readConcertsByIds(concertObjectIds);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const readConcertsByIds = async (concertIds: (string | undefined)[]): Promise<ConcertProperty[]> => {
  try {
    const concertObjectIds = concertIds;
    const firestoreDatabase = getFirestore();
    const queryForConcert = await query(collection(firestoreDatabase, 'concerts'), where(documentId(), 'in', concertObjectIds));
    const querySnapshot = await getDocs(queryForConcert);
    return querySnapshot.docs.map((currentDoc) => {
      const data = currentDoc.data();
      const result = {
        ...data,
        id: currentDoc.id,
      };
      return result as ConcertProperty;
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const createArtist = async (newArtist: ArtistProperty): Promise<ArtistProperty> => {
  try {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, 'artists'), newArtist);
    if (newArtist.concerts.length > 0) {
      for (const concertToUpdate of newArtist.concerts) {
        if (concertToUpdate) {
          const updateDocRef = doc(db, 'concerts', concertToUpdate);
          updateDoc(updateDocRef, {
            artists: arrayUnion(docRef.id),
          });
        }
      }
    }
    return newArtist;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      name: 'error',
      genre: 'error',
      description: 'error',
      concerts: ['eroror'],
    };
  }
};

const ARTIST_ALGOLIA_INDEX: string = process.env.REACT_APP_ARTIST_ALGOLIA_INDEX as string;

const readArtistsApiBySearch = async (artistOption: string): Promise<ArtistProperty[]> => {
  try {
    const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    const algoliaIndex = algoliaClient.initIndex(ARTIST_ALGOLIA_INDEX);
    const { hits: searchResults } = await algoliaIndex.search(artistOption);
    if (searchResults.length <= 0) return [];
    const concertObjectIds = searchResults.map((searchResult) => searchResult.objectID);
    return readArtistsByIds(concertObjectIds);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const readArtistsByIds = async (artistIds: (string | undefined)[]): Promise<ArtistProperty[]> => {
  const concertObjectIds = artistIds;
  const firestoreDatabase = getFirestore();
  const queryForConcert = await query(collection(firestoreDatabase, 'artists'), where(documentId(), 'in', concertObjectIds));
  const querySnapshot = await getDocs(queryForConcert);
  return querySnapshot.docs.map((currentDoc) => {
    const data = currentDoc.data();
    const result = {
      ...data,
      id: currentDoc.id,
    };
    return result as ArtistProperty;
  });
};

export {
  retrieveConcerts, retrieveConcert, createConcert, readConcertApi, readSingleConcertApiByTitle, createArtist, readArtistsApiBySearch, readArtistsByIds, readConcertsByIds,
};
