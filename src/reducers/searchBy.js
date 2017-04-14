function searchBy(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_RANGE' :
            return {...state,
                priceMinRange: action.priceMinRange,
                priceMaxRange: action.priceMaxRange
            };
        default:
            return state;
    }
}

export default searchBy;