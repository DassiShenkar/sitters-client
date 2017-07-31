export function setParentData(userData) {
    return {
        type: 'SET_PARENT_DATA',
        userData
    }
}

export function changeIsParentFlag(isParent) {
    return {
        type: 'CHANGE_IS_PARENT_FLAG',
        isParent
    }
}

export function setSitterData(sitterData) {
    return {
        type: 'SET_SITTER_DATA',
        sitterData
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