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
        case 'SET_SHOW_ON_SEARCH' :
            return {...state,
                enableShowOnSearch: action.shouldEnableShowOnSearch
            };
        default:
            return state;
    }
}

export default settings;