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
        case 'CHANGE_CITY' :
            return {
                ...state,
                city: action.city
            };
        case 'CHANGE_STREET' :
            return {
                ...state,
                street: action.street
            };
        case 'CHANGE_HOUSE_NUMBER' :
            return {
                ...state,
                houseNumber: action.houseNumber
            };
        case 'CHANGE_CHILD_MAX_PRICE_FOR_WATCH' :
            return {
                ...state,
                watchMaxPrice: action.watchMaxPrice
            };
        case 'CHANGE_CHILD_NAME' :
            return {
                ...state,
                childName: action.childName
            };
        case 'CHANGE_CHILD_AGE' :
            return {
                ...state,
                childAge: action.childAge
            };
        case 'CHANGE_CHILD_EXPERTISE' :
            return {
                ...state,
                childExpertise:  action.childExpertise
            };
        case 'CHANGE_CHILD_HOBBIES' :
            return {
                ...state,
                childHobbies:  action.childHobbies
            };

        case 'CHANGE_CHILD_SPECIAL_NEEDS' :
            return {
                ...state,
                childSpecialNeeds:  action.childSpecialNeeds
            };
        case 'CHANGE_PARTNER_NAME' :
            return {
                ...state,
                partnerName:  action.partnerName
            };
        case 'CHANGE_PARTNER_EMAIL' :
            return {
                ...state,
                partnerEmail:  action.partnerEmail
            };
        case 'CHANGE_PARTNER_GENDER' :
            return {
                ...state,
                partnerGender:  action.partnerGender
            };
        case 'CHANGE_LANGUAGES' :
            return {
                ...state,
                languages:  action.languages
            };
        case 'CHANGE_SITTER_MINIMUM_AGE' :
            return {
                ...state,
                sitterMinAge:  action.sitterMinAge
            };
        case 'CHANGE_SITTER_MAXIMUM_AGE' :
            return {
                ...state,
                sitterMaxAge:  action.sitterMaxAge
            };
        case 'CHANGE_SITTER_HOUR_FEE' :
            return {
                ...state,
                hourFee:  action.hourFee
            };
        case 'CHANGE_SITTER_IMMEDIATE_AVAILABILITY' :
            return {
                ...state,
                sitterImmediateAvailability:  action.sitterImmediateAvailability
            };
        case 'CHANGE_SITTER_MOBILITY' :
            return {
                ...state,
                sitterMobility:  action.sitterMobility
            };
        case 'CHANGE_SITTER_EXPERTISE' :
            return {
                ...state,
                sitterExpertise:  action.sitterExpertise
            };
        case 'CHANGE_SITTER_HOBBIES' :
            return {
                ...state,
                sitterHobbies:  action.sitterHobbies
            };

        case 'CHANGE_SITTER_SPECIAL_NEEDS' :
            return {
                ...state,
                sitterSpecialNeeds:  action.sitterSpecialNeeds
            };
        case 'CHANGE_SITTER_EXPERIENCE' :
            return {
                ...state,
                sitterExperience:  action.sitterExperience
            };
        case 'CHANGE_SITTER_EDUCATION' :
            return {
                ...state,
                sitterEducation:  action.sitterEducation
            };

        // case 'CHANGE_PERSONALITY_TEST_QUESTION' :
        //     let questions = state.personalityTestQuestions;
        //     questions[action.question.id] = action.question;
        //     return {
        //         ...state,
        //         personalityTestQuestions : questions
        //     };
        case 'CHANGE_PERSONALITY_QUESTION' :
            let questions = state.personalityQuestions;
            let index = action.question.index;
            delete action.question['index'];
            questions[index] = action.question;
            return {
                ...state,
                personalityQuestions : questions
            };


        default:
            return state;
    }
}

export default register;