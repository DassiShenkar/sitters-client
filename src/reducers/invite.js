function invites(state = [], action) {
    switch (action.type) {
        case 'ADD_INVITE' :
            return [...state, {
                date: action.date,
                time: action.time,
                location: action.location,
                comments: action.comments
            }];
        case 'UPDATE_DATE' :
            return [...state, {
                date: action.date
            }];
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
        case 'SET_NOTES' :
            return {
                ...state,
                notes: action.notes,
            };
        default:
            return state;
    }
}

export default invites;