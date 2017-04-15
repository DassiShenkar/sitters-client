export function setSitter(sitter) {
    return {
        type: 'SET_SITTER',
        sitter
    }
}

export function setMatchScore(matchScore) {
    return {
        type: 'SET_MATCH_SCORE',
        matchScore
    }
}

export function setDistance(distance) {
    return {
        type: 'SET_DISTANCE',
        distance
    }
}