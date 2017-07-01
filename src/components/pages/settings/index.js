// external sources
import React from 'react';
import axios from 'axios';
import {Button, PageHeader} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import strings from "../../../static/strings";
import './style.css'
import PushBase from "../../../push/PushBase";
import * as _ from "lodash";


const pushButton = null;
const applicationServerPublicKey = 'BA9TXkOAudBsHZCtma-VftBiXmAc-Ho4M7SwAXRpZDR-DsE6pdMP_HVTTQaa3vkQuHLcB6hB87yiunJFUEa4Pas';

let isSubscribed = false;
let swRegistration = null;

class Settings extends React.Component {


    constructor(props) {
        super(props);
        this.initialiseUI = this.initialiseUI.bind(this);
        this.updateBtn = this.updateBtn.bind(this);
        this.subscribeUser = this.subscribeUser.bind(this);
        this.unsubscribeUser = this.unsubscribeUser.bind(this);
        this.updateSubscriptionOnServer = this.updateSubscriptionOnServer.bind(this);
        this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this);
    }

    initialiseUI() {

        // Set the initial subscription value
        const self = this;
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);

                //self.updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                // self.updateBtn();
            });
    }

    updateBtn() {
        if (Notification.permission === 'denied') {
            console.log('Push Messaging Blocked');
            // pushButton.disabled = true;
            this.updateSubscriptionOnServer(null);
            return;
        }

        if (isSubscribed) {
            console.log('Disable Push Messaging');
        } else {
            console.log('Enable Push Messaging');
        }

        // pushButton.disabled = false;
    }

    subscribeUser() {
        console.log('subscribe-user');
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
        const self = this;
        navigator.serviceWorker.ready.then(function(swRegistration) {
            swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
                .then(function (subscription) {
                    console.log('User is subscribed.');
                    self.updateSubscriptionOnServer(subscription);
                    isSubscribed = true;

                    // self.updateBtn();
                })
                .catch(function (err) {
                    console.log('Failed to subscribe the user: ', err);
                    // self.updateBtn();
                });
        });
    }

    unsubscribeUser() {
        const self = this;
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function(error) {
            console.log('Error unsubscribing', error);
        })
        .then(function() {
            self.updateSubscriptionOnServer(null);

            console.log('User is unsubscribed.');
            isSubscribed = false;

           //this.updateBtn();
        });
}

    updateSubscriptionOnServer(subscription) {
        if (subscription) {
            if(!isSubscribed){
                let user = this.props.user;
                user.pushNotifications = JSON.parse(JSON.stringify(subscription));
                const endPoint = this.props.user.isParent? 'parent/update': 'sitter/update';
                axios({
                    method: 'post',
                    url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + endPoint,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: user
                }).then(function (res) {
                    console.log(res);
                    if (res.data) {  // invite created
                        // self.props.actions.feedActions.showInvitePopup(false);
                        // self.props.router.push('/');
                        console.log('push notifications for ' + user.name + " updated")
                    }
                    else { // invite not created
                        //TODO: think about error when user not created
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                        //TODO: think about error when user not created
                    });
            }
            // subscriptionDetails.classList.remove('is-invisible');
        } else {
            // subscriptionDetails.classList.add('is-invisible');
        }
    }

    urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }


    componentDidMount() {
        const self = this;
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('/sw.js')
                .then(function(swReg) {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                    self.initialiseUI();
                })
                .catch(function(error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging is not supported');
            // pushButton.textContent = 'Push Not Supported';
        }

        navigator.serviceWorker.addEventListener('message', function(event) {
            console.log("Got reply from service worker-PUSH: " + event.data);
        });

        // Are we being controlled?
        if (navigator.serviceWorker.controller) {
            // Yes, send our controller a message.
            console.log("Sending 'hi' to controller");
            navigator.serviceWorker.controller.postMessage("hi");
            // No, register a service worker to control pages like us.
            // Note that it won't control this instance of this page, it only takes effect
            // for pages in its scope loaded *after* it's installed.
            navigator.serviceWorker.register("/sw.js")
                .then(function(registration) {
                    console.log("Service worker registered, scope: " + registration.scope);
                    console.log("Refresh the page to talk to it.");
                    // If we want to, we might do `location.reload();` so that we'd be controlled by it
                })
                .catch(function(error) {
                    console.log("Service worker registration failed: " + error.message);
                });
        }
    }

    handleApplyChanges(e) {
        e.preventDefault();

        let user = this.props.user;
        if(this.props.settings.enableNotifications){

            this.subscribeUser();
        }
        else{
            user.pushNotifications = {};
            this.unsubscribeUser();
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
        let self = this;
        const path = this.props.user.isParent? 'parent/update': 'sitter/update';
        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
        }).then(function (res) {
            if (res.data) {  // user created
                console.log('updated settings');
                self.props.router.push('/');
            }
            else {
                console.log("settings not updated");
                //TODO: think about error
            }
        })
            .catch(function (error) {
                alert(error);
                //TODO: think about error
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

    render() {
        const suggestion = this.props.user.isParent?
            <label htmlFor="suggestions-switch">Allow Suggestions
                <Toggle
                    defaultChecked={this.props.settings.enableSuggestions}
                    onChange={this.handleSuggestionsChange.bind(this)}
                />
            </label>: null;
        const showOnSearch = !this.props.user.isParent?
            <label htmlFor="showOnSearch-switch">Show on search
                <Toggle
                    defaultChecked={this.props.settings.enableShowOnSearch}
                    onChange={this.handleShowOnSearchChange.bind(this)}
                />
            </label> : null;
        return (
            <div id="settings-page" className="page">
                <PageHeader>Settings</PageHeader>

                <form id="settings-form" onSubmit={this.handleApplyChanges.bind(this)}>
                    <label htmlFor="notifications-switch">Allow Notifications
                        <Toggle
                            defaultChecked={this.props.settings.enableNotifications}
                            onChange={this.handleNotificationChange.bind(this)}
                        />
                    </label>
                    {suggestion}
                    {showOnSearch}
                    <Button className="submit-settings" title="Send Review" bsStyle="primary" onClick={this.handleApplyChanges.bind(this)}>Apply Changes</Button>
                </form>
            </div>
        );
    }
}
export default Settings;
