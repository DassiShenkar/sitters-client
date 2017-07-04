// external sources
import React from 'react';

// components
import {NavDropdown, MenuItem}  from 'react-bootstrap/lib';

// style
import './style.css';

export default class DropdownMenu extends React.Component {
    nav(target) {
        if (target === 'logout') {
            document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'is_parent=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            target = 'login';
        }
        this.props.router.push('/' + target);
    }

    render() {
        return (
            <NavDropdown id="actions-dropdown" title={this.props.title? this.props.title: ""}>
                <MenuItem onClick={this.nav.bind(this, 'editProfile')}><span
                    className="icon-user">Edit Profile</span></MenuItem>
                <MenuItem onClick={this.nav.bind(this, 'settings')}><span
                    className="icon-widget">Settings</span></MenuItem>
                <MenuItem divider/>
                <MenuItem onClick={this.nav.bind(this, 'logout')}><span
                    className="icon-unlock">Log Out</span></MenuItem>
            </NavDropdown>
        );
    }
}
