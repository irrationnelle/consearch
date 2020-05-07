const initialState: {
    concerts: any[];
} = {
    concerts: [{
        title: "last live",
        artist: "amenra",
        address: "서울시청",
        price: 10000
    },{
        
        title: "debut live",
        artist: "leprous",
        address: "인천 국제 공항",
        price: 30000
    }]
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
        return {
        ...state,
        concerts: []
    };
    default:
      return state
  }
}

export default concert;
