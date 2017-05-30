import React from 'react';

const applicationServerPublicKey = 'BA9TXkOAudBsHZCtma-VftBiXmAc-Ho4M7SwAXRpZDR-DsE6pdMP_HVTTQaa3vkQuHLcB6hB87yiunJFUEa4Pas';

const pushButton = null;

let isSubscribed = false;
let swRegistration = null;

class PushBase extends React.Component {

    constructor(props) {
        super(props);
        this.initialiseUI = this.initialiseUI.bind(this);
        this.updateBtn = this.updateBtn.bind(this);
        this.subscribeUser = this.subscribeUser.bind(this);
        this.updateSubscriptionOnServer = this.updateSubscriptionOnServer.bind(this);
        this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this);
    }

    // componentDidMount() {
    //     const pushButton = document.getElementsByClassName('js-push-btn')[0];
    //     const self = this;
    //     if ('serviceWorker' in navigator && 'PushManager' in window) {
    //         console.log('Service Worker and Push is supported');
    //
    //         navigator.serviceWorker.register('/sw.js')
    //             .then(function(swReg) {
    //                 console.log('Service Worker is registered', swReg);
    //
    //                 swRegistration = swReg;
    //                 self.initialiseUI();
    //             })
    //             .catch(function(error) {
    //                 console.error('Service Worker Error', error);
    //             });
    //     } else {
    //         console.warn('Push messaging is not supported');
    //         pushButton.textContent = 'Push Not Supported';
    //     }
    // }



    initialiseUI() {
        // pushButton.addEventListener('click', function () {
        //     pushButton.disabled = true;
        //     if (isSubscribed) {
        //
        //         // TODO: Unsubscribe user
        //     } else {
        //         this.subscribeUser();
        //     }
        // });

        // Set the initial subscription value
        const self = this;
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);

                self.updateSubscriptionOnServer(subscription);

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
        console.log('subcribe-user');
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

                    self.updateBtn();
                })
                .catch(function (err) {
                    console.log('Failed to subscribe the user: ', err);
                    self.updateBtn();
                });
        });
    }

    updateSubscriptionOnServer(subscription) {
        // TODO: Send subscription to application server



        const subscriptionJson = document.getElementsByClassName('js-subscription-json')[0];
        // const subscriptionDetails =
        //     document.getElementsByClassName('js-subscription-details')[0];

        if (subscription) {
            subscriptionJson.textContent = JSON.stringify(subscription);

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
}
export default PushBase;