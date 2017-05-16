function workingHours(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_WORKING_HOUR_DAY' :
            return {...state,
                [action.day.toLowerCase()] : action.workingHours

            };
        default:
            return state;
    }
}

export default workingHours;