export function changeInviteFromTime(fromTime) {
    return {
        type: 'CHANGE_INVITE_FROM_TIME',
        fromTime
    }
}

export function changeInviteToTime(toTime) {
    return {
        type: 'CHANGE_INVITE_TO_TIME',
        toTime
    }
}

export function changeInviteDate(inviteDate,inviteDay,isoValue) {
    return {
        type: 'CHANGE_INVITE_DATE',
        inviteDate,
        inviteDay,
        isoValue
    }
}

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
