export function setMatches(sitters) {
    return {
        type: 'SET_MATCHES',
        sitters
    }
}

export function setFilteredMatches(filteredMatches) {
    return {
        type: 'SET_FILTERED_MATCHES',
        filteredMatches
    }
}

export function setNavView(navView) {
    return {
        type: 'SET_NAV_VIEW',
        navView
    }
}

export function setSitterIndex(sitterIndex) {
    return {
        type: 'SET_SITTER_INDEX',
        sitterIndex
    }
}

export function showInvitePopup(show) {
    return {
        type: 'SHOW_INVITE_POPUP',
        show
    }
}

export function showNotificationsPopup(showNotifications) {
    return {
        type: 'SHOW_NOTIFICATIONS_POPUP',
        showNotifications
    }
}


export function showInvitesPopup(showInvitesPopup) {
    return {
        type: 'SHOW_INVITES_POPUP',
        showInvitesPopup
    }
}