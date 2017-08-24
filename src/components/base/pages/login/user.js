function user(state = {}, action) {
    switch (action.type) {
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
                friends: data.friends,
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
                friends: sitterData.friends,
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
                senderGCM: sitterData.senderGCM
            };
        default:
            return state;
    }
}

export default user;