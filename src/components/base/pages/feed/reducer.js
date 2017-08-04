function feed(state = {}, action) {
    let review;
    switch (action.type) {
        case 'SET_MATCHES' :
            return {
                ...state,
                matches: action.sitters,
                filteredMatches: action.sitters
            };
        case 'SET_FILTERED_MATCHES' :
            return {
                ...state,
                filteredMatches: action.filteredMatches
            };
        case 'SET_NAV_VIEW' :
            return {
                ...state,
                navView: action.navView
            };
        case 'SET_SITTER_INDEX' :
            return {
                ...state,
                sitterIndex: action.sitterIndex
            };
        case 'SHOW_INVITE_POPUP' :
            return {
                ...state,
                show: action.show
            };
        case 'SHOW_NOTIFICATIONS_POPUP' :
            return {
                ...state,
                showNotificationsPopup: action.showNotificationsPopup
            };
        case 'SHOW_INVITES_POPUP' :
            return {
                ...state,
                showInvitesPopup: action.showInvitesPopup
            };
        case 'CHANGE_REVIEW_RATE' :
            review = state.review;
            review.rates[action.category] = action.rate;
            return {
                ...state,
                review : review
            };
        case 'CHANGE_REVIEW_TEXT' :
            review = state.review;
            review.text = action.text;
            return {
                ...state,
                review: review
            };
        case 'SHOW_REVIEW_POPUP' :
            return {
                ...state,
                showReviewPopup: action.showReviewPopup
            };
        case 'SHOW_SPINNER' :
            return {
                ...state,
                showSpinner: action.showSpinner
            };
        case 'SET_SPINNER_TEXT' :
            return {
                ...state,
                spinnerText: action.spinnerText
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
                senderGCM: sitterData.senderGCM
            };
        default:
            return state;
    }
}

export default feed;