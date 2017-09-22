export default (state = [{squares: Array(9).fill(null)}], action) => {
  switch(action.type) {
    case "CHANGE_HISTORY":
    const { history } = action;
    var newState = state.slice();
    newState = action.history;
    default:
      return state;
  }
}
