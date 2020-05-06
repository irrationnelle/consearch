const initialState: {
    concerts: any[];
} = {
    concerts: []
}
function concert(state = initialState, action: {type: string; payload: {concerts: any[]};}) {
  switch (action.type) {
    case "REQ_CONCERTS_SUCCEEDED":
          return {
              ...state,
              concerts: [
                  ...state.concerts,
                  ...action.payload.concerts
              ]

          }
    case "USER_FETCH_FAILED":
      return state - 1
    case "USER_FETCH_REQUESTED":
        console.log('%caction: ', 'background: white; color: orange;', action);
      return state * 10
    default:
      return state
  }
}

export default concert;
