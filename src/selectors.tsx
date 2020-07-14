import { createSelector } from 'reselect';
import { format, parseISO } from 'date-fns';

import { RawConcert } from './@models/concert';

const getState = (state: {concerts: RawConcert[]}) => state;

const getSelector = createSelector(getState, (state: unknown) => state);
const concertsSelector = createSelector(getState,
  (state: {concerts: RawConcert[]}) => state.concerts.map((concert) => ({
    ...concert,
    time: format(parseISO(concert.timetable), 'HH:mma'),
    date: format(parseISO(concert.timetable), 'yyyy-MM-dd'),
  })));

export { getSelector, concertsSelector };
