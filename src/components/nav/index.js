//external sources
import React from 'react';

import {Navbar, Nav, NavItem, Badge, Image}  from 'react-bootstrap/lib';

//Components
import NavBase from '../../base/NavBase';
import Search from '../../styles/icons/Search';
import NotificationSVG from '../../styles/icons/Notification';
import MailSVG from '../../styles/icons/Mail';
import DropdownMenu from '../DropDownMenu';

//style
import './style.css';


class MainNav extends NavBase {

    render() {
        return (
            <Navbar id="main-nav">
                <Navbar.Header>
                    <Image src={this.props.user.profilePicture} alt={this.props.user.name} circle
                           onClick={this.onClick.bind(this, "main")}/>
                    <Navbar.Brand
                        onClick={this.onClick.bind(this, "main")}>{'Hi, ' + this.props.user.name}</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.onClick.bind(this, "searchBy")}>
                        <Search/>
                    </NavItem>
                    <NavItem onClick={this.onClick.bind(this, "notifications")}>
                        <NotificationSVG/>
                        <Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge>
                    </NavItem>
                    <NavItem onClick={this.onClick.bind(this, "invites")}>
                        <MailSVG/>
                        <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
                    </NavItem>
                    <DropdownMenu {...this.props}/>
                </Nav>
            </Navbar>
        )
    }
}

export default MainNav;