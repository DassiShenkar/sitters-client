// external sources
import React from 'react';

// components


//style
// import '../style.css';
import InviteItem from "./inviteItem/index";

class InvitesList extends React.Component{
    render() {
        return (
            <div>
                {this.props.invites.map((invite, index) => <InviteItem {...this.props}  key={index} invite={invite}/>)}
            </div>
        )
    }
}

export default InvitesList;

