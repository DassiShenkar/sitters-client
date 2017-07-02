//external sources
import React from 'react';
import {browserHistory} from 'react-router';
//Components
import {Navbar, Nav, NavItem, Badge, Image, OverlayTrigger, Popover}  from 'react-bootstrap/lib';
import DropdownMenu from '../../controllers/dropdownMenu/index';
import List from '../../lists/List';

//style
import './style.css';

class MainNav extends React.Component {

    componentWillMount(){
        const self = this;
        navigator.serviceWorker.addEventListener('message', function(event) {
            let object = JSON.parse(event.data);
            if("parentID" in object[0] && self.props.user.name){ // new invite
                console.log("new invite");
                self.props.actions.actionCreators.setInvites(self.props.user.invites.concat(object[0]));
            }
            // console.log("Got reply from service worker-PUSH: " + event.data);
        });
    }
    nav(view) {
        this.props.router.getCurrentLocation().pathname === '/'? this.props.action(view):browserHistory.goBack();
    }

    render() {

        const notifications = (<Popover id="popover-trigger-click-root-close" title="NOTIFICATIONS">
            <List items={this.props.user.notifications} type='notification' isParent={this.props.user.isParent}/>
        </Popover>);

        const invites = (<Popover id="popover-trigger-click-root-close" title="INVITES">
            <List items={this.props.user.invites} type='invite' isParent={this.props.user.isParent}/>
        </Popover>);

        const newInvites = this.props.invites.filter(invite => (this.props.user.isParent && !invite.wasRead && invite.status !== 'waiting') || (!this.props.user.isParent && !invite.wasRead && invite.status === 'waiting'));
        const newNotifications = this.props.notifications.filter(notification => !notification.wasRead);

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
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.props.user.isParent ? <NavItem onClick={this.nav.bind(this, "searchBy")}><span
                                className="icon-search"/></NavItem> : null}
                        {this.props.user.isParent ?
                            <OverlayTrigger trigger="focus" placement="bottom" overlay={notifications}>
                                <NavItem>
                                    <span className="icon-bell-o"/>
                                    {newNotifications.length > 0 ? <Badge>{newNotifications.length}</Badge> : ''}
                                </NavItem>
                            </OverlayTrigger> : null}
                        <OverlayTrigger trigger="focus" placement="bottom" overlay={invites}>
                            <NavItem>
                                <span className="icon-envelope-o"/>
                                {newInvites.length > 0 ? <Badge>{newInvites.length}</Badge> : ''}
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