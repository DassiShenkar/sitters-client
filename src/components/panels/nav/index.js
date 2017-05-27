//external sources
import React from 'react';

//Components
import {Navbar, Nav, NavItem, Badge, Image, OverlayTrigger, Popover}  from 'react-bootstrap/lib';
import DropdownMenu from '../../controllers/dropdownMenu/index';
import List from '../../lists/List';

//style
import './style.css';

class MainNav extends React.Component {

    nav(view) {
        this.props.action(view);
    }

    render() {

        const notifications = (<Popover id="popover-trigger-click-root-close" title="NOTIFICATIONS">
            <List items={this.props.user.notifications} type='notification' isParent={this.props.user.isParent}/>
        </Popover>);

        const invites = (<Popover id="popover-trigger-click-root-close" title="INVITES">
            <List items={this.props.user.invites} type='invite' isParent={this.props.user.isParent}/>
        </Popover>);

        return (
            <Navbar id="main-nav" fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href=""
                           onClick={this.nav.bind(this, "main")}>{this.props.router.getCurrentLocation().pathname !== '/' ?
                            <span className="glyphicon glyphicon-menu-left"/> : 'Sitters'}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Text pullRight>
                    <Image src={this.props.user.profilePicture} alt={this.props.user.name} circle/>
                </Navbar.Text>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.props.user.isParent ? <NavItem onClick={this.nav.bind(this, "searchBy")}><span
                                className="icon-search"/></NavItem> : null}
                        {this.props.user.isParent ?
                            <OverlayTrigger trigger="focus" placement="bottom" overlay={notifications}><NavItem><span
                                className="icon-bell-o"/><Badge>{this.props.notifications.filter(notification => !notification.wasRead).length}</Badge></NavItem></OverlayTrigger> : null}
                        <OverlayTrigger trigger="focus" placement="bottom" overlay={invites}><NavItem>
                            <span className="icon-envelope-o"/>
                            <Badge>{this.props.invites.filter(invite => !invite.wasRead).length}</Badge>
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