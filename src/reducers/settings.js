function settings(state = {}, action) {
    switch (action.type) {
        case 'SET_NOTIFICATIONS' :
            return {...state,
                enableNotifications: action.shouldEnableNotifications

            };
        case 'SET_SUGGESTIONS' :
            return {...state,
                enableSuggestions: action.shouldEnableSuggestions

            };
        default:
            return state;
    }
}

export default settings;