// external sources
import React from 'react';

// components
import InviteItem from "./inviteItem/index";

//style
import './style.css';

class InvitesList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div>
                {this.props.invites.map((invite, index) => <InviteItem isParent={this.props.isParent}  key={index} invite={invite}/>)}
            </div>
        )
    }
}

export default InvitesList;

