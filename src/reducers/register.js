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
        case 'CHANGE_LANGUAGES' :
            return {
                ...state,
                languages:  action.languages
            };

        default:
            return state;
    }
}

export default register;