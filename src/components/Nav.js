//external sources
import React from 'react';

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
                <Button onClick={this.onClick.bind(this, "main")}>
                    <img src={this.props.image} alt={this.props.alt}/>
                </Button>
                <Button onClick={this.onClick.bind(this, "main")}>
                    <p>{ "Hi," + this.props.name}</p>
                </Button>
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
                <DropdownMenu {...this.props}/>
            </div>
        )
    }
}

export default Nav;