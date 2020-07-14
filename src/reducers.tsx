import { RawConcert } from './@models/concert';

const initialState: {
    concerts: RawConcert[];
} = {
  concerts: [],
};

function concert(
  state = initialState,
  action: { type: string; payload: { concerts: RawConcert[] } },
) : {concerts: RawConcert[]} {
  switch (action.type) {
    case 'REQ_CONCERTS_SUCCEEDED':
      return {
        ...state,
        concerts: [...action.payload.concerts],
      };
    case 'REQ_CONCERTS_FAILED':
    default:
      return state;
  }
}

export { initialState, concert };
