function sitterProfile(state = {}, action) {
    switch (action.type) {
        case 'SET_DISTANCE' :
            return {
                ...state,
                distance: action.distance
            };
        case 'SET_MATCH_DATA_VIEW':
            return {
                ...state,
                shouldDisplayMatchInfo: action.shouldDisplayMatchInfo
            };
        case 'SET_SITTER' :
            return {
                ...state,
                sitter: action.sitter
            };
        default:
            return state;
    }
}

export default sitterProfile;