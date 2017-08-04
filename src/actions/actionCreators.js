export function changeIsParentFlag(isParent) {
    return {
        type: 'CHANGE_IS_PARENT_FLAG',
        isParent
    }
}

export function setInvites(invites) {
    return {
        type: 'SET_INVITES',
        invites
    }
}

export function setNotifications(notifications) {
    return {
        type: 'SET_NOTIFICATIONS',
        notifications
    }
}