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
        case 'SET_PARENT_DATA' :
            const data = action.userData;
            return {
                ...state,
                _id: data._id,
                userType: data.userType,
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
                blacklist: data.blacklist,
                settings: data.settings,
                matchBI: data.matchBI,
                reviews: data.reviews,
                personalityTest: data.personalityTest,
                personality: data.personality,
                mutualFriends: data.mutualFriends,
                isParent: data.isParent,
                pushNotifications: data.pushNotifications,
                preferedGender: data.preferedGender,
                partner: data.partner,
                senderGCM: data.senderGCM
            };

        case 'SET_SITTER_DATA' :
            const sitterData = action.sitterData;
            return {
                ...state,
                _id: sitterData._id,
                userType: sitterData.userType,
                address: sitterData.address,
                age: sitterData.age,
                coverPhoto: sitterData.coverPhoto,
                email: sitterData.email,
                gender: sitterData.gender,
                invites: sitterData.invites,
                joinedTime: sitterData.joinedTime,
                languages: sitterData.languages,
                name: sitterData.name,
                notifications: sitterData.notifications,
                profilePicture: sitterData.profilePicture,
                timezone: sitterData.timezone,
                settings: sitterData.settings,
                reviews: sitterData.reviews,
                personalityTest: sitterData.personalityTest,
                personality: sitterData.personality,
                motto: sitterData.motto,
                mutualFriends: sitterData.mutualFriends,
                isParent: sitterData.isParent,
                hourFee: sitterData.hourFee,
                availableNow: sitterData.availableNow,
                lastInvite: sitterData.lastInvite,
                workingHours: sitterData.workingHours,
                expertise: sitterData.expertise,
                specialNeeds: sitterData.specialNeeds,
                mobility: sitterData.mobility,
                hobbies: sitterData.hobbies,
                experience: sitterData.experience,
                maxAge: sitterData.maxAge,
                minAge: sitterData.minAge,
                education: sitterData.education,
                multipleInvites: sitterData.multipleInvites,
                senderGCM: data.senderGCM
            };
        case 'CHANGE_USER_ADDRESS' :
            return {
                ...state,
                address: action.address
            };
        case 'CHANGE_IS_PARENT_FLAG' :
            return {
                ...state,
                isParent: action.isParent
            };
        case 'SET_INVITES' :
            return {
                ...state,
                invites: action.invites
            };
        case 'SET_NOTIFICATIONS' :
            return {
                ...state,
                notifications: action.notifications
            };
        default:
            return state;
    }
}

export default user;