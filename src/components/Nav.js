//external sources
import React from 'react';
import {Link} from 'react-router';

import Badge from '../../node_modules/react-bootstrap/lib/Badge';
import {Button} from "react-bootstrap";

//Components
import NavBase from '../base/NavBase'
import Search from '../styles/icons/Search'
import NotificationSVG from '../styles/icons/Notification'
import MailSVG from '../styles/icons/Mail'
import DropdownMenu from './DropDownMenu'



class Nav extends NavBase {

    render() {
        return (
            <div id="main-nav">
                <img src={this.props.image} alt={this.props.alt}/>
                <p>{ "Hi," + this.props.name}</p>
                <Button onClick={this.onClick.bind(this, "searchBy")}>
                    <Search/>
                </Button>
                <Button onClick={this.onClick.bind(this, "notifications")}>
                    <NotificationSVG/>
                    <Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge>
                </Button>
                <Button onClick={this.onClick.bind(this, "invites")}>
                    <MailSVG/>
                    <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
                </Button>

                {/*<Link to="/search" onClick={this.onClickSearch}><SearchSVG/></Link>*/}
                {/*<Link to="/notifications"*/}
                      {/*onClick={this.onClickMail}><MailSVG/>*/}
                    {/*<Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge>*/}
                {/*</Link>*/}
                {/*<Link to="/invites"*/}
                      {/*onClick={this.onClickNotification}><MailSVG/>*/}
                    {/*<Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>*/}
                {/*</Link>*/}
                <DropdownMenu {...this.props}/>
            </div>
        )
    }
}

export default Nav;