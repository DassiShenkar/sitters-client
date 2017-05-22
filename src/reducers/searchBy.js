function searchBy(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_RANGE' :
            return {...state,
                priceMinRange: action.priceMinRange,
                priceMaxRange: action.priceMaxRange
            };
        case 'CHANGE_INVITE_FROM_TIME' :
            return {
                ...state,
                fromTime: action.fromTime,
            };
        case 'CHANGE_INVITE_TO_TIME' :
            return {
                ...state,
                toTime: action.toTime,
            };
        case 'CHANGE_INVITE_DATE' :
            return {
                ...state,
                inviteDate: action.inviteDate,
                inviteDay: action.inviteDay,
                isoValue: action.isoValue
            };
        case 'SET_VIEW' :
            return {
                ...state,
                searchView: action.searchView
            };
        case 'CHANGE_AVAILABILITY' :
            return {
                ...state,
                availability: action.availability
            };
        default:
            return state;
    }
}

export default searchBy;