import React from 'react';
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
                <img src={this.props.profilePicture} alt={this.props.alt}/>
                <p>Hi,{this.props.name}</p>
                <button onClick={this.onClickSearch}><SearchSVG/></button>
                <button onClick={this.onClickMail}><NotificationSVG/><Badge>3</Badge></button>
                <button onClick={this.onClickNotification}><MailSVG/><Badge>1</Badge></button>
                <DropdownMenu/>
            </div>
        )
    }
}

export default Nav;