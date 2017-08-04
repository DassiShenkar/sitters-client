// external sources
import React from 'react';

// components
import {NavDropdown, MenuItem}  from 'react-bootstrap';
import DropDownMenuBase from "../../base/controllers/dropDownMenu/index";

// style
import './style.css';

export default class DropdownMenu extends DropDownMenuBase {
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