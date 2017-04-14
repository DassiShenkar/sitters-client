export function setNotifications(shouldEnableNotifications) {
    return {
        type: 'SET_NOTIFICATIONS',
        shouldEnableNotifications
    }
}

export function setSuggestions(shouldEnableSuggestions) {
    return {
        type: 'SET_SUGGESTIONS',
        shouldEnableSuggestions
    }
}



