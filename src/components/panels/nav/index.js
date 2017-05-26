//external sources
import React from 'react';

//Components
import {Navbar, Nav, NavItem, Badge, Image}  from 'react-bootstrap/lib';
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
        return (
            <Navbar id="main-nav" fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"
                           onClick={this.onClick.bind(this, "main")}>{this.props.router.getCurrentLocation().pathname !== '/' ?
                            <span className="glyphicon glyphicon-menu-left"/> : 'Sitters'}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Text pullRight>
                    <Image src={this.props.user.profilePicture} alt={this.props.user.name} circle/>
                </Navbar.Text>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.props.user.isParent ? <NavItem onClick={this.onClick.bind(this, "searchBy")}><span
                                className="icon-search"/></NavItem> : null}
                        {this.props.user.isParent ? <NavItem onClick={this.onClick.bind(this, "notifications")}><span
                                className="icon-bell-o"/><Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge></NavItem> : null}
                        <NavItem onClick={this.onClick.bind(this, "invites")}>
                            <span className="icon-envelope-o"/>
                            <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
                        </NavItem>
                        <DropdownMenu title={this.props.user.name} {...this.props}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MainNav;