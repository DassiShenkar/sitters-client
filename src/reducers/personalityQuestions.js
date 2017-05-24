function personalityQuestions(state = {}, action) {
    switch (action.type) {

        case 'CHANGE_PERSONALITY_QUESTION' :
            let question = action.question;
            let index = action.question.index;
            delete action.question['index'];
            return {
                ...state,
                [index] : question

            };
        default:
            return state;
    }
}

export default personalityQuestions;