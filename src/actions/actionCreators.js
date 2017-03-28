export function increment(index) {
    return {
        type: 'INCREMENT',
        index
    }
}

export function addReview(reviewId, author, content) {
    return {
        type: 'ADD_REVIEW',
        reviewId,
        author,
        content
    }
}

export function removeReview(reviewId, index) {
    return {
        type: 'REMOVE_REVIEW',
        reviewId,
        index
    }
}