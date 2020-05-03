import { createSelector } from 'reselect'

const getState = (state: any) => state;

const getSelector = createSelector(getState, (state: any) => state);

export { getSelector };
