//external sources
import React from 'react';
import {Link} from 'react-router';

import Badge from '../../node_modules/react-bootstrap/lib/Badge';

//Components
import NavBase from '../base/NavBase'
import SearchSVG from '../styles/icons/Search'
import NotificationSVG from '../styles/icons/Notification'
import MailSVG from '../styles/icons/Mail'
import DropdownMenu from './DropDownMenu'

class Nav extends NavBase {
    render() {
        return (
            <div id="main-nav">
                <img src={this.props.image} alt={this.props.alt}/>
                <p>{ "Hi," + this.props.name}</p>
                <Link to="/search" onClick={this.onClickSearch}><SearchSVG/></Link>
                <Link to="/notifications"
                      onClick={this.onClickMail}><NotificationSVG/>
                    <Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge>
                </Link>
                <Link to="/invites"
                      onClick={this.onClickNotification}><MailSVG/>
                    <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
                </Link>
                <DropdownMenu {...this.props}/>
            </div>
        )
    }
}

export default Nav;