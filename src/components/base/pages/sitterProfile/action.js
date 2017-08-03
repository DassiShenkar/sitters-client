export function setDistance(distance) {
    return {
        type: 'SET_DISTANCE',
        distance
    }
}

export function displayMatchInfo(shouldDisplayMatchInfo) {
    return {
        type: 'SET_MATCH_DATA_VIEW',
        shouldDisplayMatchInfo
    }
}