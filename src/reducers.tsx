import { RawConcert } from './@models/concert';

const initialState: {
    concerts: RawConcert[];
    inputedGenres: string[];
} = {
  concerts: [],
  inputedGenres: [],
};

interface Action {
  type: string;
}

interface GenreAction extends Action{
    payload: {
      genre: string
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
) : { concerts: RawConcert[]; inputedGenres: string[] } {
  switch (action.type) {
    case 'concerts/readSuccess':
      return {
        ...state,
        concerts: [...(action as ConcertsAction).payload.concerts],
      };
    case 'concerts/addGenre':
      return {
        ...state,
        inputedGenres: [
          ...state.inputedGenres,
          (action as GenreAction).payload.genre,
        ],
      };
    case 'concerts/readFail':
    default:
      return state;
  }
}

export { initialState, concert };
