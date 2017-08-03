function user(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_USER_TYPE' :
            return {
                ...state,
                userType: action.userType
            };
        case 'CREATE_USER' :
            const facebookData = action.facebookData;
            return {
                ...state,
                facebookID: facebookData.id,
                name: facebookData.name,
                coverPhoto: facebookData.cover,
                birthday: facebookData.birthday,
                currency: facebookData.currency,
                education: facebookData.education,
                email: facebookData.email,
                gender: facebookData.gender,
                languages: facebookData.languages,
                location: facebookData.location,
                timezone: facebookData.timezone,
                picture: facebookData.picture,
                friends: facebookData.friends.data
            };
        default:
            return state;
    }
}

export default user;