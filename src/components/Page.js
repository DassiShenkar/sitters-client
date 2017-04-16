import React from "react";

import Nav from './nav/index';


class Page extends React.Component {
    render() {
        return(
        <div id="page">
            <Nav name={typeof this.props.ownProps.user.name !== 'undefined' ?  this.props.ownProps.user.name : ''}
                 image={typeof this.props.ownProps.user.profilePicture !== 'undefined'?  this.props.ownProps.user.profilePicture : ''}
                 alt={typeof this.props.ownProps.user.name !== 'undefined'?  this.props.ownProps.user.name : ''}
                 invites={this.props.ownProps.user.invites.length > 0?  this.props.ownProps.user.invites : ''}
                 notifications={this.props.ownProps.user.notifications.length > 0 ?  this.props.ownProps.user.notifications : ''}
                 {...this.props}/>
        </div>
        );
    }
}

export default Page;