export function authenticateUser(isAuthenticated) {
    return {
        type: 'AUTH_USER',
        isAuthenticated
    }
}

export function changeUserType(userType) {
    return {
        type: 'CHANGE_USER_TYPE',
        userType
    }
}

export function createUser(userData) {

    return {
        type: 'CREATE_USER',
        userData
    }
}