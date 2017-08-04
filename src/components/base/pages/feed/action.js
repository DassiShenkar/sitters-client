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

export function showNotificationsPopup(showNotificationsPopup) {
    return {
        type: 'SHOW_NOTIFICATIONS_POPUP',
        showNotificationsPopup
    }
}


export function showInvitesPopup(showInvitesPopup) {
    return {
        type: 'SHOW_INVITES_POPUP',
        showInvitesPopup
    }
}

export function changeReviewRate(category,rate) {
    return {
        type: 'CHANGE_REVIEW_RATE',
        category,
        rate
    }
}

export function changeReviewText(text) {
    return {
        type: 'CHANGE_REVIEW_TEXT',
        text
    }
}

export function showReviewPopup(showReviewPopup) {
    return {
        type: 'SHOW_REVIEW_POPUP',
        showReviewPopup
    }
}

export function showSpinner(showSpinner) {
    return {
        type: 'SHOW_SPINNER',
        showSpinner
    }
}

export function setSpinnetText(spinnerText) {
    return {
        type: 'SET_SPINNER_TEXT',
        spinnerText
    }
}

export function setParentData(userData) {
    return {
        type: 'SET_PARENT_DATA',
        userData
    }
}

export function setSitterData(sitterData) {
    return {
        type: 'SET_SITTER_DATA',
        sitterData
    }
}