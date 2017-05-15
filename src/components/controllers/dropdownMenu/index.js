// external sources
import React from 'react';

// components
import {NavDropdown, MenuItem}  from 'react-bootstrap/lib';

import Person from '../../icons/Person';
import Settings from '../../icons/Settings';
import Logout from '../../icons/Logout';



export default class DropdownMenu extends React.Component {


    editProfile() {
        this.props.router.push('/editProfile');
    }

    settings() {
        this.props.router.push('/settings');
    }

    logout() {
        // localStorage.removeItem('auth_token');// delete the user information from the browser
        document.cookie =   'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.props.router.push('/login');
    }

    render() {
        return (
            <NavDropdown id="actions-dropdown" title={this.props.user.name ? this.props.user.name : ''}>
                <MenuItem onClick={this.editProfile.bind(this)}><Person/>Edit Profile</MenuItem>
                <MenuItem onClick={this.settings.bind(this)}><Settings/>Settings</MenuItem>
                <MenuItem divider/>
                <MenuItem onClick={this.logout.bind(this)}><Logout/>Log Out</MenuItem>
            </NavDropdown>
        );
    }
}
