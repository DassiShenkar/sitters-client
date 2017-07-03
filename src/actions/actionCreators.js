export function changeUserType(userType) {
    return {
        type: 'CHANGE_USER_TYPE',
        userType
    }
}

export function createUser(facebookData) {

    return {
        type: 'CREATE_USER',
        facebookData
    }
}

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

