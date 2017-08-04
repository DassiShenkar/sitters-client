//external sources
import {createStore, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import strings from './static/strings';
import dateFormat from 'dateformat';

//reducers
import rootReducer from './reducers/index';
import moment from "moment";

//set initial state
const defaultState = {
    reviews: [],
    user: {
        userType: strings.USER_TYPE[0],
        invites: [],
        notifications: [],
        personalityTest : [],
        isParent: true
    },
    feed: {
        matches: [],
        filteredMatches: [],
        sitterIndex: 0,
        show: false,
        showNotificationsPopup: false,
        showInvitesPopup: false,
        showReviewPopup: false,
        showSpinner: false,
        spinnerText: '',
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
        view: 'step1',
        name: "",
        email: "",
        age: "",
        gender: "",
        partnerEmail:"",
        partnerName: "",
        childName: "",
        childAge: "",
        watchMaxPrice: "",
        languages: [],
        sitterExperience: "",
        sitterEducation: [],
        sitterMinAge: "",
        sitterMaxAge: "",
        hourFee: "",
        sitterMotto: ""
    },
    editProfile: {
        name: "",
        email: "",
        age: "",
        partnerEmail:"",
        partnerName: "",
        partnerGender: "",
        childName: "",
        childAge: "",
        childExpertise: [],
        childSpecialNeeds: [],
        childHobbies: [],
        sitterExpertise: [],
        sitterSpecialNeeds: [],
        sitterHobbies: [],
        watchMaxPrice: "",
        languages: [],
        sitterExperience: "",
        sitterEducation: [],
        sitterMinAge: "",
        sitterMaxAge: "",
        hourFee: "",
        sitterMotto: ""
    },
    settings: {
        enableNotifications: false,
        enableSuggestions: true
    },
    searchBy : {
        inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
        inviteDay: dateFormat(new Date(), "dddd"),
        fromTime: moment(),
        toTime: moment(),
        isoValue: new Date().toISOString(),
        searchView: 'time',
        availability: "Available Now",
        workingHours: []
    },
    invite: {
        inviteDate: dateFormat(new Date(), "mm/dd/yyyy"),
        inviteDay: dateFormat(new Date(), "dddd"),
        fromTime: moment(),
        toTime: moment(),
        isoValue: new Date().toISOString(),
        recurringDate: dateFormat(new Date(), "mm/dd/yyyy"),
        recurringInviteDay: dateFormat(new Date(), "dddd"),
        recurringIsoValue:  new Date().toISOString(),
        recurring: "No"
    },
    range: {
        priceMinRange:0,
        priceMaxRange:50
    },
    sitterFeed:{
        calenderDate: moment()
    },
    sitterProfile: {sitter: {
        workingHours:{},
        hobbies: [],
        languages: [],
        education: [],
        address: {},
        reviews: [],
        expertise: [],
        mobility: []
    },
        distance: "",
        expandReview: false,
        shouldDisplayMatchInfo: false
    },

};

//enable redux in chrome dev tools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const middleware = routerMiddleware(browserHistory);

const store = createStore(rootReducer, defaultState, enhancers, applyMiddleware(middleware));

export const history = syncHistoryWithStore(browserHistory, store);

//enable got reload for debugging
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;



