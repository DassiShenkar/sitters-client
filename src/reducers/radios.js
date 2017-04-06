function radios(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_USER_TYPE' :
            return {
                ...state,
                userType: action.userType
            };
        case 'CHANGE_GENDER' :
            return  {
                ...state,
                gender: action.gender
            };
        default:
            return state;
    }
}


export default radios;