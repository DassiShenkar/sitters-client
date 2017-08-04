function searchBy(state = {}, action) {
    switch (action.type) {
        case 'SET_VIEW' :
            return {
                ...state,
                searchView: action.searchView
            };
        default:
            return state;
    }
}

export default searchBy;