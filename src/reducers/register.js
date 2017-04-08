function register(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_GENDER' :
            return {
                ...state,
                gender: action.gender
            };
        case 'CHANGE_NAME' :
            return {
                ...state,
                name: action.name
            };
        case 'CHANGE_EMAIL' :
            return {
                ...state,
                email: action.email
            };
        case 'CHANGE_AGE' :
            return {
                ...state,
                age: action.age
            };
        default:
            return state;
    }
}

export default register;