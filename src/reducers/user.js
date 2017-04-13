function user(state = {}, action) {
    switch (action.type) {
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
                email : facebookData.email,
                gender: facebookData.gender,
                languages: facebookData.languages,
                location: facebookData.location,
                timezone: facebookData.timezone,
                picture: facebookData.picture

            };
        case 'CHANGE_USER_TYPE' :
            return {
                ...state,
                userType: action.userType
            };
        case 'SET_USER_DATA' :
            const data = action.userData;
            return {
                ...state,
                _id: data._id,
                address: data.address,
                age: data.age,
                children: data.children,
                coverPhoto: data.coverPhoto,
                email: data.email,
                gender: data.gender,
                invites: data.invites,
                joinedTime: data.joinedTime,
                languages: data.languages,
                maxPrice: data.maxPrice,
                name: data.name,
                notifications: data.notifications,
                profilePicture: data.profilePicture,
                timezone: data.timezone,

            };
        default:
            return state;
    }
}

export default user;