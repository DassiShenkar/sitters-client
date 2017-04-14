function feed(state = {}, action) {
    switch (action.type) {
        case 'SET_MATCHES' :
            return {
                ...state,
                matches: action.sitters,
                filteredMatches: action.sitters
            };
        case 'SET_FILTERED_MATCHES' :
            return {
                ...state,
                filteredMatches: action.filteredMatches
            };
        case 'SET_NAV_VIEW' :
            return {
                ...state,
                navView: action.navView
            };
        case 'SET_SITTER_INDEX' :
            return {
                ...state,
                sitterIndex: action.sitterIndex
            };
        default:
            return state;
    }
}

export default feed;