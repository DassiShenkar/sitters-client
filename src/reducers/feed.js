function feed(state = {}, action) {
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

        default:
            return state;
    }
}

export default feed;