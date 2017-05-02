function router(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_VALID_FLAG' :
            return {
                ...state,
                validFlag: action.validFlag
            };

        case 'ADD_SCENE' :
            return {
                ...state,
                scene: action.scene
            };

        default:
            return state;
    }
}

export default router;
