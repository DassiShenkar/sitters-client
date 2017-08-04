function sitterFeed(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_CALENDER_DATE' :
            return {
                ...state,
                calenderDate: action.calenderDate,
            };
        default:
            return state;
    }
}

export default sitterFeed;