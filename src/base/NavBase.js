import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    onClick(view) {
            this.props.action(view);
        if(view === "invites")
            this.props.actions.feedActions.showInvitesPopup(true);
        else if(view === "notifications")
            this.props.actions.feedActions.showNotificationsPopup(true);
        this.props.router.push('/'); // always back to feed with the view chosen
    }
}

export default NavBase;
