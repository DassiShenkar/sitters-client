//external sources
import React from 'react';

//Components
import MainNavBase from "../../base/panels/nav/index";
import {Navbar, Nav, NavItem, Badge, Image, OverlayTrigger, Popover}  from 'react-bootstrap';
import DropdownMenu from '../../controllers/dropdownMenu/index';
import List from '../../lists/genericList/index';

//style
import './style.css';

class MainNav extends MainNavBase {
    render() {
        const notifications = (<Popover id="popover-trigger-click-root-close" title="NOTIFICATIONS">
            <List items={this.props.user.notifications} type='notification' isParent={this.props.user.isParent}/>
        </Popover>);

        const invites = (<Popover id="popover-trigger-click-root-close" title="INVITES">
            <List items={this.props.user.invites} type='invite' isParent={this.props.user.isParent}/>
        </Popover>);

        const newInvites = this.props.user.invites.filter(invite => (this.props.user.isParent && !invite.wasRead && invite.status !== 'waiting') || (!this.props.user.isParent && !invite.wasRead && invite.status === 'waiting'));
        let newNotifications = [];
        if(this.props.user.notifications)
            newNotifications = this.props.user.notifications.filter(notification => !notification.wasRead);

        return (
            <Navbar id="main-nav" fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"
                           onClick={this.nav.bind(this, null)}>{this.props.router.getCurrentLocation().pathname !== '/' ?
                            <span className="glyphicon glyphicon-menu-left"/> : 'Sitters'}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Text pullRight>
                    <Image src={this.props.user.profilePicture} alt={this.props.user.name} circle/>
                </Navbar.Text>
                <Navbar.Collapse className="nav-icons">
                    <Nav pullRight>
                        {this.props.user.isParent ? <NavItem onClick={this.nav.bind(this, "searchBy")}><span
                            className="icon-search"/></NavItem> : null}
                        {this.props.user.isParent ?
                            <OverlayTrigger trigger="focus" placement="bottom" overlay={notifications}>
                                <NavItem>
                                    <span className="icon-bell-o">
                                    {newNotifications.length > 0 ? <Badge>{newNotifications.length}</Badge> : ''}
                                    </span>
                                </NavItem>
                            </OverlayTrigger> : null}
                        <OverlayTrigger trigger="focus" placement="bottom" overlay={invites}>
                            <NavItem>
                                <span className="icon-envelope-o">
                                {newInvites.length > 0 ? <Badge>{newInvites.length}</Badge> : ''}
                                </span>
                            </NavItem>
                        </OverlayTrigger>
                        <DropdownMenu title={this.props.user.name} {...this.props}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MainNav;