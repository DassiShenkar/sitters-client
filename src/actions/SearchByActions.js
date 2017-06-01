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

export function setView(searchView) {
    return {
        type: 'SET_VIEW',
        searchView
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

export function changeAvailability(availability) {
    return {
        type: 'CHANGE_AVAILABILITY',
        availability
    }
}


export function changeWorkingHours(workingHours) {
    return {
        type: 'CHNGE_WORKING_HOURS',
        workingHours
    }
}