import { Concert } from "./@models/concert";

const initialState: {
    concerts: Concert[];
} = {
    concerts: []
};

function concert(
    state = initialState,
    action: { type: string; payload: { concerts: Concert[] } }
) {
    switch (action.type) {
        case "REQ_CONCERTS_SUCCEEDED":
            console.log(action);
            return {
                ...state,
                concerts: [...action.payload.concerts]
            };
        case "REQ_CONCERTS_FAILED":
        default:
            return state;
    }
}

export { initialState, concert };
