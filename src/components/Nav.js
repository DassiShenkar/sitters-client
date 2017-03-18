import React from 'react';
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
                <p>Hi,{this.props.name}</p>
                <button onClick={this.onClickSearch}><SearchSVG/></button>
                <button onClick={this.onClickMail}><NotificationSVG/></button>
                <button onClick={this.onClickNotification}><MailSVG/></button>
                <DropdownMenu/>
            </div>
        )
    }
}

export default Nav;