function calendar(state = {}, action) {
    switch (action.type) {
        case 'SHOW_INFO' :
            return {
                ...state,
                showInfo: action.info
            };
        case 'ADD_DATA' :
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

export default calendar;
