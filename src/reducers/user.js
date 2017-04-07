function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_USER' :
            return {
                ...state,
                user: action.userData
            };
        case 'CHANGE_USER_TYPE' :
            return {
                ...state,
                userType: action.userType
            };
        default:
            return state;
    }
}


export default user;