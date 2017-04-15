function sitterProfile(state = {}, action) {
    switch (action.type) {
        case 'SET_SITTER' :
            return {
                ...state,
                sitter: action.sitter
            };
        case 'SET_MATCH_SCORE' :
            return {
                ...state,
                matchScore: action.matchScore
            };
        case 'SET_DISTANCE' :
            return {
                ...state,
                distance: action.distance
            };

        default:
            return state;
    }
}

export default sitterProfile;