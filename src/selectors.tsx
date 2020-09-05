import { createSelector } from 'reselect';
import { format, parseISO } from 'date-fns';

import { RawConcert } from './@models/concert';

const getState = (state: {concerts: RawConcert[], inputedGenres: string[]}) => state;

const getSelector = createSelector(getState, (state: unknown) => state);
const concertsSelector = createSelector(getState,
  (state: {concerts: RawConcert[], inputedGenres: string[]}) => {
    const currentConcerts = state.concerts.map((concert) => ({
      ...concert,
      time: format(parseISO(concert.timetable), 'HH:mma'),
      date: format(parseISO(concert.timetable), 'yyyy-MM-dd'),
    }));

    const hasAllGenres = state.inputedGenres.length === 0;
    const hasSelectGenre = (concert: RawConcert) => concert.artists.filter(
      (artist) => state.inputedGenres.includes(artist.genre),
    ).length > 0;
    const byGenre = (concert: RawConcert) => hasAllGenres || hasSelectGenre(concert);
    return currentConcerts.filter(byGenre);
  });

export { getSelector, concertsSelector };
