import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/reducers/index';


export default function configureStore() {

    //set initial state
    const defaultState = {
        reviews: [],
        user: {
            userType: "I'm a Parent",
            invites: [],
            notifications: []
        },
        feed: {
            matches: []
        },
        register : {personalityTestQuestions : []}
    };

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStore(
        rootReducer,
        defaultState,
        enhancers,
        applyMiddleware(thunk)
    );

    //enable hot reload for debugging
    if (module.hot) {
        module.hot.accept('../../src/reducers/', () => {
            const nextRootReducer = require('../../src/reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store
}
