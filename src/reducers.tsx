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
    case 'concerts/readSuccess':
      return {
        ...state,
        concerts: [...action.payload.concerts],
      };
    case 'concerts/readFail':
    default:
      return state;
  }
}

export { initialState, concert };
