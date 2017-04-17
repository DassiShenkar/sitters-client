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