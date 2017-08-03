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
        default:
            return state;
    }
}

export default sitterProfile;