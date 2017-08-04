function user(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_IS_PARENT_FLAG' :
            return {
                ...state,
                isParent: action.isParent
            };
        case 'SET_INVITES' :
            return {
                ...state,
                invites: action.invites
            };
        case 'SET_NOTIFICATIONS' :
            return {
                ...state,
                notifications: action.notifications
            };
        default:
            return state;
    }
}

export default user;