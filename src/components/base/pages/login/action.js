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