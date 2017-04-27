// external sources
import React from 'react';

// components
import InviteItem from './inviteItem/index';

//style
import './style.css';

class InvitesList extends React.Component{

    render() {
        return (
            <ul className="invites-list">
                {this.props.user.invites.map((invite, index) => <InviteItem {...this.props}  key={index} invite={invite}/>)}
            </ul>
        )
    }
}

export default InvitesList;

