interface Concert {
    title: string;
    artist: string;
    address: string;
    price: number;
}

const initialState: {
    concerts: Concert[];
} = {
    concerts: [
        {
            title: "last live",
            artist: "amenra",
            address: "서울시청",
            price: 10000
        },
        {
            title: "debut live",
            artist: "leprous",
            address: "인천 국제 공항",
            price: 30000
        }
    ]
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
        default:
            return state;
    }
}

export { initialState, concert };
