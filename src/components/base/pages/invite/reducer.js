function invite(state = {}, action) {
    switch (action.type) {
        case 'SET_INVITES' :
            return {
                ...state,
                invites: action.invites
            };
        default:
            return state;
    }
}

export default invite;