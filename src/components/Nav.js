import React from 'react';
import { Link } from 'react-router';
import Badge from '../../node_modules/react-bootstrap/lib/Badge';
import NavBase from '../base/NavBase'
import SearchSVG from '../styles/icons/Search'
import NotificationSVG from '../styles/icons/Notification'
import MailSVG from '../styles/icons/Mail'
import DropdownMenu from './DropDownMenu'

class Nav extends NavBase {
    render() {
        return (
            <div>
                <img src={this.props.image} alt={this.props.alt}/>
                <p>{ " Hi," + this.props.name}</p>
                <Link to="/search" onClick={this.onClickSearch}><SearchSVG/></Link>
                <Link to="/notifications" onClick={this.onClickMail}><NotificationSVG/><Badge>3</Badge></Link>
                <Link to="/invites" onClick={this.onClickNotification}><MailSVG/><Badge>1</Badge></Link>
                <DropdownMenu {...this.props}/>
            </div>
        )
    }
}

export default Nav;