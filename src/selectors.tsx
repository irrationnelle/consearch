import { createSelector, OutputSelector } from 'reselect';
import { format, parseISO } from 'date-fns';

import { RawConcert, Concert } from './@models/concert';

interface ConcertState {concerts: RawConcert[], inputedGenres: string[], inputedDate: string}

const toDecimalInteger = (targetParam: number | string): number => (typeof targetParam === 'number' ? targetParam : parseInt(targetParam, 10));

const getState = (state: ConcertState) => state;

const getSelector = createSelector(getState, (state: ConcertState) => state);
const concertsSelector = createSelector(getState,
  ({ concerts, inputedGenres, inputedDate }: ConcertState) => {
    const currentConcerts = concerts.map((concert) => ({
      ...concert,
      time: format(parseISO(concert.timetable), 'HH:mma'),
      date: format(parseISO(concert.timetable), 'yyyy-MM-dd'),
    }));

    const hasAllGenres = inputedGenres.length === 0;
    const hasSelectGenre = (concert: Concert) => concert.artists.filter(
      (artist) => inputedGenres.includes(artist.genre),
    ).length > 0;
    const byGenre = (concert: Concert) => hasAllGenres || hasSelectGenre(concert);
    const byDate = (concert: Concert) => (inputedDate ? concert.date === inputedDate : true);
    return currentConcerts.filter(byGenre).filter(byDate);
  });

// eslint-disable-next-line max-len
const concertSelector = (concertId: number | string) : OutputSelector<ConcertState, { date: string; address: string; artists: { name: string; genre: string }[]; price: number; id: number; time: string; title: string; timetable: string }, (res: { date: string; address: string; artists: { name: string; genre: string }[]; price: number; id: number; time: string; title: string; timetable: string }[]) => { date: string; address: string; artists: { name: string; genre: string }[]; price: number; id: number; time: string; title: string; timetable: string }> => createSelector(concertsSelector, (concerts) => {
  const currentConcertId = toDecimalInteger(concertId);
  return concerts.reduce((acc, curr) => (curr.id === currentConcertId ? curr : acc));
});

export { getSelector, concertsSelector, concertSelector };
