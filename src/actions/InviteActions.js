export function sendInvite(date, time, location, comments) {
    return {
        type: 'ADD_INVITE',
        date,
        time,
        location,
        comments
    }
}

export function updateDate(date) {
    return {
        type: 'UPDATE_DATE',
        date
    }
}

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

export function setNotes(notes) {
    return {
        type: 'SET_NOTES',
        notes
    }
}

export function changeRecurringDate(recurringDate,recurringDay,recurringIsoValue) {
    return {
        type: 'CHANGE_RECURRING_DATE',
        recurringDate,
        recurringDay,
        recurringIsoValue
    }
}

export function setInvites(invites) {
    return {
        type: 'SET_INVITES',
        invites
    }
}

export function changeRecurring(recurring) {
    return {
        type: 'CHANGE_RECURRING',
        recurring
    }
}
