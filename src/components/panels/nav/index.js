//external sources
import React from 'react';

import {Navbar, Nav, NavItem, Badge, Image}  from 'react-bootstrap/lib';

//Components
import DropdownMenu from '../../controllers/dropdownMenu/index';

//style
import './style.css';


class MainNav extends React.Component {

    onClick(view) {
        this.props.action(view);
        if (view === "invites")
            this.props.actions.feedActions.showInvitesPopup(true);
        else if (view === "notifications")
            this.props.actions.feedActions.showNotificationsPopup(true);
        this.props.router.push('/');
    }

    render() {
        const searchBy = this.props.user.isParent?
            <NavItem onClick={this.onClick.bind(this, "searchBy")}>
            <span className="icon-search"/>
            </NavItem>: null;
        const notifications = this.props.user.isParent?
            <NavItem onClick={this.onClick.bind(this, "notifications")}>
                <span className="icon-bell-o"/>
                <Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge>
            </NavItem>: null;
        return (
            <Navbar id="main-nav">
                <Navbar.Header>
                    <Navbar.Brand onClick={this.onClick.bind(this, "main")}>Sitters</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {searchBy}
                    {notifications}
                    <NavItem onClick={this.onClick.bind(this, "invites")}>
                        <span className="icon-envelope-o"/>
                        <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
                    </NavItem>
                    <Image src={this.props.user.profilePicture} alt={this.props.user.name} circle/>
                    <DropdownMenu {...this.props}/>
                </Nav>
            </Navbar>
        )
    }
}

export default MainNav;