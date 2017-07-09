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
        case 'SET_REVIEW_DESCRIPTION':
            return {
                ...state,
                reviewDescription: action.reviewDescription
            };
        case 'SET_EXPAND_REVIEW':
            return {
                ...state,
                expandReview: action.expandReview
            };
        case 'SET_MATCH_DATA_VIEW':
            return {
                ...state,
                shouldDisplayMatchInfo: action.shouldDisplayMatchInfo
            };
        case 'SET_MATCH_DATA':
            return {
                ...state,
                matchData: action.matchData
            };
        default:
            return state;
    }
}

export default sitterProfile;