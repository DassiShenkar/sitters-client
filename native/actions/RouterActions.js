export function changeValidFlag(validFlag) {
    return {
        type: 'CHANGE_VALID_FLAG',
        validFlag
    }
}

export function addScene(scene) {
    return {
        type: 'ADD_SCENE',
        scene
    }
}
