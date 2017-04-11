function feed(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_INVITE_FROM_TIME' :
            return {...state,
                fromTime: action.fromTime,
            };
        default:
            return state;
    }
}

export default feed;