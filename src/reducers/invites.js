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
        default:
            return state;
    }
}

export default invites;