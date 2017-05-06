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
        default:
            return state;
    }
}

export default feed;