function reviews(state = [], action) {
    switch (action.type) {
        case 'ADD_REVIEW' :
            return [...state, {
                author: action.author,
                content: action.content
            }];
        default:
            return state;
    }
}


export default reviews;