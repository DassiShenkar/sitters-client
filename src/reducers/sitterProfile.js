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

        default:
            return state;
    }
}

export default sitterProfile;