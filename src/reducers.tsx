import { RawConcert } from './@models/concert';

const initialState: {
    concerts: RawConcert[];
    inputGenres: string[]
} = {
  concerts: [],
  inputGenres: [],
};

interface Action {
  type: string;
}

interface GenreAction extends Action{
    payload: {
      genres: string[]
    }
}

interface ConcertsAction extends Action {
    payload: {
      concerts: RawConcert[]
    }
}

type TotalAction = ConcertsAction | GenreAction;

function concert(
  state = initialState,
  action: TotalAction,
) : { concerts: RawConcert[]; inputGenres: string[] } {
  switch (action.type) {
    case 'concerts/readSuccess':
      return {
        ...state,
        concerts: [...(action as ConcertsAction).payload.concerts],
      };
    case 'concerts/addGenre':
      return {
        ...state,
        inputGenres: [...(action as GenreAction).payload.genres],
      };
    case 'concerts/readFail':
    default:
      return state;
  }
}

export { initialState, concert };
