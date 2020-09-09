import { createSelector, OutputSelector } from 'reselect';
import { format, parseISO } from 'date-fns';

import { RawConcert, Concert } from './@models/concert';

interface ConcertState {concerts: RawConcert[], inputedGenres: string[], inputedDate: string}

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

const concertSelector = (concertId: number | string): any => createSelector(concertsSelector, (concerts: Concert[]) => {
  const currentConcertId = typeof concertId === 'number' ? concertId : parseInt(concertId, 10);

  const currentConcert = concerts.reduce((acc, curr) => {
    if (curr.id === currentConcertId) {
      acc = curr;
    }
    return acc;
  });
  return currentConcert;
});

export { getSelector, concertsSelector, concertSelector };
