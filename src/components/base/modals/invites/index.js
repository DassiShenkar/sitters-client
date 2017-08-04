// external sources
import React from 'react';

export default class InvitesModalBase extends React.Component{
    closePopup(){
        this.props.actions.feedActions.showInvitesPopup(false)
    }
}