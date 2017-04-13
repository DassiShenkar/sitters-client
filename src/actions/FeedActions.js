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
