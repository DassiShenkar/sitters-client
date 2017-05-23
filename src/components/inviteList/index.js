// external sources
import React from 'react';

// components


//style
// import '../style.css';
import InviteItem from "./inviteItem/index";

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

