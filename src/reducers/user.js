function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_USER' :
            return {
                ...state,
                user: action.userData
            };
        default:
            return state;
    }
}


export default user;