function editProfile(state = {}, action) {
    switch (action.type) {
        case 'EP_CHANGE_GENDER' :
            return {
                ...state,
                gender: action.gender
            };
        case 'EP_CHANGE_NAME' :
            return {
                ...state,
                name: action.name
            };
        case 'EP_CHANGE_EMAIL' :
            return {
                ...state,
                email: action.email
            };
        case 'EP_CHANGE_AGE' :
            return {
                ...state,
                age: action.age
            };
        case 'EP_CHANGE_CITY' :
            return {
                ...state,
                city: action.city
            };
        case 'EP_CHANGE_STREET' :
            return {
                ...state,
                street: action.street
            };
        case 'EP_CHANGE_HOUSE_NUMBER' :
            return {
                ...state,
                houseNumber: action.houseNumber
            };
        case 'EP_CHANGE_CHILD_MAX_PRICE_FOR_WATCH' :
            return {
                ...state,
                watchMaxPrice: action.watchMaxPrice
            };
        case 'EP_CHANGE_CHILD_NAME' :
            return {
                ...state,
                childName: action.childName
            };
        case 'EP_CHANGE_CHILD_AGE' :
            return {
                ...state,
                childAge: action.childAge
            };
        case 'EP_CHANGE_CHILD_EXPERTISE' :
            return {
                ...state,
                childExpertise:  action.childExpertise
            };
        case 'EP_CHANGE_CHILD_HOBBIES' :
            return {
                ...state,
                childHobbies:  action.childHobbies
            };

        case 'EP_CHANGE_CHILD_SPECIAL_NEEDS' :
            return {
                ...state,
                childSpecialNeeds:  action.childSpecialNeeds
            };
        case 'EP_CHANGE_PARTNER_NAME' :
            return {
                ...state,
                partnerName:  action.partnerName
            };
        case 'EP_CHANGE_PARTNER_EMAIL' :
            return {
                ...state,
                partnerEmail:  action.partnerEmail
            };
        case 'EP_CHANGE_PARTNER_GENDER' :
            return {
                ...state,
                partnerGender:  action.partnerGender
            };
        case 'EP_CHANGE_LANGUAGES' :
            return {
                ...state,
                languages:  action.languages
            };
        case 'EP_CHANGE_SITTER_MINIMUM_AGE' :
            return {
                ...state,
                sitterMinAge:  action.sitterMinAge
            };
        case 'EP_CHANGE_SITTER_MAXIMUM_AGE' :
            return {
                ...state,
                sitterMaxAge:  action.sitterMaxAge
            };
        case 'EP_CHANGE_SITTER_HOUR_FEE' :
            return {
                ...state,
                hourFee:  action.hourFee
            };
        case 'EP_CHANGE_SITTER_IMMEDIATE_AVAILABILITY' :
            return {
                ...state,
                sitterImmediateAvailability:  action.sitterImmediateAvailability
            };
        case 'EP_CHANGE_SITTER_MOBILITY' :
            return {
                ...state,
                sitterMobility:  action.sitterMobility
            };
        case 'EP_CHANGE_SITTER_EXPERTISE' :
            return {
                ...state,
                sitterExpertise:  action.sitterExpertise
            };
        case 'EP_CHANGE_SITTER_HOBBIES' :
            return {
                ...state,
                sitterHobbies:  action.sitterHobbies
            };

        case 'EP_CHANGE_SITTER_SPECIAL_NEEDS' :
            return {
                ...state,
                sitterSpecialNeeds:  action.sitterSpecialNeeds
            };
        case 'EP_CHANGE_SITTER_EXPERIENCE' :
            return {
                ...state,
                sitterExperience:  action.sitterExperience
            };
        case 'EP_CHANGE_SITTER_EDUCATION' :
            return {
                ...state,
                sitterEducation:  action.sitterEducation
            };
        case 'EP_CHANGE_GENDER_WATCH_CHILD' :
            return {
                ...state,
                watchChildGender : action.watchChildGender
            };

        case 'EP_CHANGE_REGISTER_VIEW' :
            return {
                ...state,
                view : action.view
            };
        case 'EP_CHANGE_PERSONALITY_ITEMS' :
            return {
                ...state,
                items : action.items
            };
        case 'EP_CHANGE_HAVE_PARTNER' :
            return {
                ...state,
                havePartner : action.havePartner
            };
        case 'EP_CHANGE_SITTER_MOTTO' :
            return {
                ...state,
                sitterMotto : action.sitterMotto
            };
        default:
            return state;
    }
}

export default editProfile;