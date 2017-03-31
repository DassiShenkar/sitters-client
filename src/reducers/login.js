function authUser(state = [], action) {
    switch (action.type) {
        case 'AUTH_USER' :
            return [...state, {
                isAuthenticated: action.isAuthenticated,
            }];
        default:
            return state;
    }
}


export default authUser;