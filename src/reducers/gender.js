function radios(state = [], action) {
    switch (action.type) {
        case 'ADD_RADIO' :
            return [...state, {
                radio: action.radio,
            }];
        case 'ADD_RADIO' :
            return [...state, {
                radio: action.radio,
            }];
        default:
            return state;
    }
}


export default radios;