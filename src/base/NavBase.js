import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    onClick(view) {
        if(view !== 'invites')
            this.props.action(view);
        else{
            this.props.actions.feedActions.showInvitesPopup(true);
        }
            this.props.router.push('/'); // always back to feed with the view chosen
    }
}

export default NavBase;
