import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk'
import dateFormat from 'dateformat';
import moment from "moment";

import strings from '../../src/static/strings';
import router from '../reducers/router'
import location from '../reducers/location'
import calendar from '../reducers/calendar'
// import reviews from '../../src/components/base/pages//reducer;
import user from '../../src/reducers/user';
import register from '../../src/components/base/pages/forms/reducer';
import feed from '../../src/components/base/pages/feed/reducer';
import settings from '../../src/components/base/pages/settings/reducer';
import searchBy from '../../src/components/base/modals/invite/reducer';
import range from '../../src/components/base/modals/invite/reducer';
import invite from '../../src/components/base/pages/invite/reducer';
import sitterProfile from '../../src/reducers/sitterProfile';
import workingHours from '../../src/components/base/modals/invite/reducer';


export default function configureStore() {

    //set initial state
    const defaultState = {
        router: {
            state: '',
            validFlag: false
        },
        location: {
            lat: 0,
            lng: 0
        },
        calendar: {
            data: {},
            showInfo: false
        },
        reviews: [],
        user: {
            userType: "I'm a Parent",
            invites: [],
            notifications: []
        },
        feed: {
            matches: [],
            filteredMatches: [],
            sitterIndex: 0,
            show: false,
            showNotificationsPopup: false,
            showInvitesPopup: false,
            review: {
                text:'',
                rates: {
                    punctioal: 0,
                    behavior: 0,
                    connection: 0,
                    general: 0
                }
            }
        },
        register : {
            childHobbies: [],
            childExpertise: [],
            childSpecialNeeds: [],
            sitterHobbies: [],
            sitterExpertise: [],
            sitterSpecialNeeds: [],
            address: "",
            items: [],
            havePartner: strings.BOOLEAN[1],
            partnerGender: strings.GENDER[0],
            watchChildGender: strings.GENDER_WITH_BOTH[0],
            sitterImmediateAvailability: strings.BOOLEAN[0],
            view: 'step1'
        },
        settings: {
            enableNotifications: true,
            enableSuggestions: true
        },
        searchBy : {
            inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
            inviteDay: dateFormat(new Date(), "dddd"),
            fromTime: moment(),
            toTime: moment(),
            isoValue: new Date().toISOString(),
            searchView: 'rate',
            availability: "Available Now",
            workingHours: []
        },
        invite: {
            inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
            inviteDay: dateFormat(new Date(), "dddd"),
            fromTime: moment(),
            toTime: moment(),
            isoValue: new Date().toISOString()
        },
        range: {
            priceMinRange:0,
            priceMaxRange:50
        },
        sitterProfile: {sitter: {
            workingHours:{},
            hobbies: [],
            languages: [],
            education: [],
            address: {},
            reviews: [],
            expertise: [],
        },
            distance: "",
            expandReview: false
        }
    };

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const appReducer = combineReducers({user, /*reviews,*/ register, feed, settings, searchBy, range, sitterProfile, invite, workingHours, router, location, calendar, routing: routerReducer});

    const rootReducer = (state, action) => {
        return appReducer(state, action)
    };

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
