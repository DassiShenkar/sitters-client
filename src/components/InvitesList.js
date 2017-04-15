import React from 'react';
import InviteItem from './InviteItem';

class InvitesList extends React.Component{

    render() {
        return (
            <ul className="invites-list">
                {this.props.user.invites.map((invite, index) => <li key={index} className="invite-item"><InviteItem {...this.props}  invite={invite}/></li>)}
            </ul>
        )
    }
}

export default InvitesList;

