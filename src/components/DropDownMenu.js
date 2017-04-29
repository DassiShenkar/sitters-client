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

    render() {
        return (
            <NavDropdown id="actions-dropdown" title={this.props.user.name?this.props.user.name:''}>
                <li><Link to="/editProfile"><Person/>Edit Profile</Link></li>
                <li><Link to="/settings"><Settings/>Settings</Link></li>
                <li><Link to="/about"><Information/>About</Link></li>
                <MenuItem divider />
                <MenuItem onClick={this.logout.bind(this)}><Logout/>Log Out</MenuItem>
            </NavDropdown>
        );
    }
}

export default DropdownMenu;