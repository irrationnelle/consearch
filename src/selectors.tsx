import { createSelector } from 'reselect';
import { format, parseISO } from 'date-fns';

import { RawConcert, Concert } from './@models/concert';

const getState =
  (state: {concerts: RawConcert[], inputedGenres: string[], inputedDate: string}) => state;

const getSelector = createSelector(getState, (state: unknown) => state);
const concertsSelector = createSelector(getState,
  ({concerts, inputedGenres, inputedDate}: {concerts: RawConcert[], inputedGenres: string[], inputedDate: string}) => {
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

export { getSelector, concertsSelector };
