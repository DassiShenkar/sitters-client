function user(state = {}, action) {
    switch (action.type) {
        case 'CREATE_USER' :
            const data = action.facebookData;
            return {
                ...state,
                facebookID: data.id,
                name: data.name,
                coverPhoto: data.cover,
                birthday: data.birthday,
                currency: data.currency,
                education: data.education,
                email : data.email,
                gender: data.gender,
                languages: data.languages,
                location: data.location,
                timezone: data.timezone,
                picture: data.picture

            };
        case 'CHANGE_USER_TYPE' :
            return {
                ...state,
                userType: action.userType
            };
        case 'GET_USER_DATA' :
            const userData = action.userData;
            return {
                ...state, userData

            };
        default:
            return state;
    }
}

export default user;