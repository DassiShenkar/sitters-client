import React from "react";
import Nav from './panels/nav/index'
import './panels/nav/style.css'

class Main extends React.Component {
    render() {
        let nav = null;
        if(location.href.split('/')[location.href.split('/').length -1 ] !== 'login' && location.href.split('/')[location.href.split('/').length -1 ] !== 'register' &&location.href.split('/')[location.href.split('/').length -1 ] !== 'notAuthorized' ){
            nav =
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     action={this.props.actions.feedActions.setNavView}
                     {...this.props}/>;
        }
        return(
            <div id="main">
                {nav}
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default Main;