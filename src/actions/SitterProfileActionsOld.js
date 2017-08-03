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

export function setReviewDescription(reviewDescription) {
    return {
        type: 'SET_REVIEW_DESCRIPTION',
        reviewDescription
    }
}

export function setExpandReview(expandReview) {
    return {
        type: 'SET_EXPAND_REVIEW',
        expandReview
    }
}

export function setMatchData(matchData) {
    return {
        type: 'SET_MATCH_DATA',
        matchData
    }
}
