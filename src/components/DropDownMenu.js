import React from 'react';
import {Link} from 'react-router';
import 'rc-dropdown/assets/index.css';
import {NavDropdown, MenuItem}  from 'react-bootstrap/lib';
import Person from '../styles/icons/Person';
import Settings from '../styles/icons/Settings';
import Information from '../styles/icons/Information';
import Logout from '../styles/icons/Logout';


class DropdownMenu extends React.Component {

    logout() {
        localStorage.removeItem('auth_token');// delete the user information from the browser
        this.props.router.push('/login');
    }

    editProfile() {
        this.props.router.push('/editProfile');
    }

    settings() {
        this.props.router.push('/settings');
    }

    about() {
        this.props.router.push('/about');
    }

    render() {
        return (
            <NavDropdown id="actions-dropdown" title={this.props.user.name?this.props.user.name:''}>
                <MenuItem onClick={this.editProfile.bind(this)}><Person/>Edit Profile</MenuItem>
                <MenuItem onClick={this.settings.bind(this)}><Settings/>Settings</MenuItem>
                <MenuItem onClick={this.about.bind(this)}><Information/>About</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.logout.bind(this)}><Logout/>Log Out</MenuItem>
            </NavDropdown>
        );
    }
}

export default DropdownMenu;