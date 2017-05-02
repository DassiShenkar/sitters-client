function reviews(state = {}, action) {
    switch (action.type) {
        case 'ADD_REVIEW' :
            return [...state, {
                author: action.author,
                content: action.content
            }];

        case 'CHANGE_REVIEW_RATE' :
            let review = state.review;
            return {...state,
                category: action.category,
                rate: action.rate,
            };
        default:
            return state;
    }
}


export default reviews;