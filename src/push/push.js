// external sources
import React from 'react';
import PushBase from "./PushBase";

class Push extends PushBase {
    render() {
        return (
            <div>
                <p>Welcome to the push messaging codelab. The button below needs to be
                    fixed to support subscribing to push.</p>
                <p>
                    <button onClick={this.subscribeUser}
                            className="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                        Enable Push Messaging
                    </button>
                </p>
                <section className="subscription-details js-subscription-details is-invisible">
                    <p>Once you've subscribed your user, you'd send their subscription to your
                        server to store in a database so that when you want to send a message
                        you can lookup the subscription and send a message to it.</p>
                    <p>To simplify things for this code lab copy the following details
                        into the <a href="https://web-push-codelab.appspot.com/">Push Companion
                            Site</a> and it'll send a push message for you, using the application
                        server keys on the site - so make sure they match.</p>
                    <pre><code className="js-subscription-json"/></pre>
                </section>
            </div>
        )
    }
}

export default Push;

