import { createSelector } from 'reselect'

const getState = (state: any) => state;

const getSelector = createSelector(getState, (state: any) => state);
const concertsSelector = createSelector(getState, (state) => state.concerts );

export { getSelector, concertsSelector };
