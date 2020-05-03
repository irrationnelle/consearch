function counter(state = 0, action: {type: string; value: any;}) {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return state + 1
    case "USER_FETCH_FAILED":
      return state - 1
    case "USER_FETCH_REQUESTED":
        console.log('%caction: ', 'background: white; color: orange;', action);
      return state * 10
    default:
      return state
  }
}

export default counter;
