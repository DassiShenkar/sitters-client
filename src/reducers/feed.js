function feed(state = {}, action) {
    switch (action.type) {
        case 'GET_MATCHES' :
            const sitters = action.sitters;
            return [
                ...state, sitters
            ];
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
        default:
            return state;
    }
}

export default feed;