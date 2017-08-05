// external sources
import React from 'react';

//statics
import strings from "../../../../static/strings";

//utils
import {post} from '../../../../utils/serverCalls';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";
import * as _ from "lodash";

let isSubscribed = false;
let swRegistration = null;

export default class SettingsBase extends React.Component {
    constructor(props) {
        super(props);
        this.initialiseUI = this.initialiseUI.bind(this);
        this.subscribeUser = this.subscribeUser.bind(this);
        this.unSubscribeUser = this.unSubscribeUser.bind(this);
        this.updateSubscriptionOnServer = this.updateSubscriptionOnServer.bind(this);
        this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this);
    }

    initialiseUI(){
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);
                if (isSubscribed)
                    console.log('User IS subscribed.');
                else
                    console.log('User is NOT subscribed.');
            });
    }

    subscribeUser() {
        console.log('subscribe-user');
        const applicationServerKey = this.urlB64ToUint8Array(strings.GOOGLE_WEB_WORKERS_API_KEY);
        const self = this;
        navigator.serviceWorker.ready.then(function(swRegistration) {
            swRegistration.pushManager.subscribe({ // register worker in browser
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
                .then(function (subscription) {
                    console.log('User is subscribed.');
                    self.updateSubscriptionOnServer(subscription);
                    isSubscribed = true;
                })
                .catch(function (err) {
                    console.log('Failed to subscribe the user: ', err);
                });
        });
    }

    unSubscribeUser() {
        const self = this;
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (subscription)
                    return subscription.unsubscribe(); // delete worker from browser
            })
            .catch(function(error) {
                console.log('Error unSubscribing', error);
            })
            .then(function() {
                self.updateSubscriptionOnServer(null);
                console.log('User is unSubscribed.');
                isSubscribed = false;
            });
    }

    updateSubscriptionOnServer(subscription) {
        if (subscription && !isSubscribed) {
            let user = this.props.user;
            user.pushNotifications = JSON.parse(JSON.stringify(subscription));
            post(this.props.user.isParent? sittersApi.UPDATE_USER: sittersApi.UPDATE_USER, user,_.noop);
        }
    }

    urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i)
            outputArray[i] = rawData.charCodeAt(i);
        return outputArray;
    }

    componentDidMount() {
        const self = this;
        this.props.actions.settingsActions.setNotifications(this.props.user.settings.allowNotification);
        if(this.props.user.isParent)
            this.props.actions.settingsActions.setSuggestions(this.props.user.settings.allowSuggestions);
        else
            this.props.actions.settingsActions.setShowOnSearch(this.props.user.settings.allowShowOnSearch);

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');
            navigator.serviceWorker.register('/sw.js') // register worker
                .then(function(swReg) {
                    console.log('Service Worker is registered', swReg);
                    swRegistration = swReg;
                    self.initialiseUI();
                })
                .catch(function(error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging is not supported'); // the browser not supporting push notifications
        }
    }

    handleApplyChanges(e) {
        e.preventDefault();
        let user = this.props.user;
        if(this.props.settings.enableNotifications)
            this.subscribeUser();
        else{
            user.pushNotifications = {};
            this.unSubscribeUser();
        }
        if(this.props.user.isParent)
            user.settings = {
                allowNotification: this.props.settings.enableNotifications,
                allowSuggestions: this.props.settings.enableSuggestions
            };
        else
            user.settings = {
                allowNotification: this.props.settings.enableNotifications,
                allowShowOnSearch: this.props.settings.enableShowOnSearch
            };
        const self = this;
        post(this.props.user.isParent? sittersApi.UPDATE_USER: sittersApi.UPDATE_USER, user, function(result){
            if (result.data) // settings updated
                self.props.router.push('/');
            else
                console.log("settings not updated");
        });
    }

    handleNotificationChange(e) {
        this.props.actions.settingsActions.setNotifications(e.target.checked);
    }

    handleSuggestionsChange(e) {
        this.props.actions.settingsActions.setSuggestions(e.target.checked);
    }

    handleShowOnSearchChange(e) {
        this.props.actions.settingsActions.setShowOnSearch(e.target.checked);
    }
}