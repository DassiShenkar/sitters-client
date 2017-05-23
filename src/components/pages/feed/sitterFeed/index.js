//external sources
import React from 'react';
import axios from 'axios';
import InviteList from '../../../inviteList'

//components

//style


class SitterFeed extends React.Component {


    render() {
        return (
            <div id="sitter-feed">
                <InviteList invites={this.props.user.invites}/>
            </div>
        );
    }
}

export default SitterFeed;
