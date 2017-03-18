import React from 'react';
import NavBase from '../base/NavBase'
import SearchSVG from '../styles/icons/Search'
import NotificationSVG from '../styles/icons/Notification'
import MailSVG from '../styles/icons/Mail'
import Arrow from '../styles/icons/Arrow'

class Nav extends NavBase {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <img src={this.props.image}/>
                <p>Hi,{this.props.name}</p>
                <button onClick={this.onClickSearch}><SearchSVG/></button>
                <button onClick={this.onClickMail}><NotificationSVG/></button>
                <button onClick={this.onClickNotification}><MailSVG/></button>
                <Arrow/>
            </div>
        )
    }
}

export default Nav;