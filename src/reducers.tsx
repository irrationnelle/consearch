import { RawConcert } from './@models/concert';

const initialState: {
    concerts: RawConcert[];
    inputedGenres: string[];
    inputedDate: string | null;
} = {
  concerts: [],
  inputedGenres: [],
  inputedDate: null,
};

interface Action {
  type: string;
}

interface GenreAction extends Action{
    payload: {
      genre: string
    }
}

interface DateAction extends Action{
    payload: {
      date: string
    }
}

interface ConcertsAction extends Action {
    payload: {
      concerts: RawConcert[]
    }
}

type TotalAction = ConcertsAction | GenreAction | DateAction;

function concert(
  state = initialState,
  action: TotalAction,
) : { concerts: RawConcert[]; inputedGenres: string[], inputedDate: null | string } {
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
    case 'concerts/addDate':
      return {
        ...state,
        inputedDate: (action as DateAction).payload.date,
      };
    case 'concerts/readFail':
    default:
      return state;
  }
}

export { initialState, concert };
