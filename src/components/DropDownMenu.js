import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import Arrow from '../styles/icons/Arrow'

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onVisibleChange = this.onVisibleChange.bind(this);

    }

    onSelect({key}) {
        switch (key) {
            case "editProfile":
                break;
            case "settings":
                break;
            case "logout":
                localStorage.user = null; // delete the user information from the browser
                console.log("User logged out");
                location.replace("/");
                break;
            case "about":
                break;
            default:
                break;
        }
    }

    onVisibleChange(visible) {
    }

    render() {
        const menu = (
            <Menu onSelect={this.onSelect}>
                <MenuItem key="editProfile">Edit Profile</MenuItem>
                <MenuItem key="settings">Settings</MenuItem>
                <MenuItem key="logout">Log Out</MenuItem>
                <MenuItem key="about">About</MenuItem>
            </Menu>
        );
        return (
            <Dropdown
                trigger={['click']}
                overlay={menu}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
            >
                <button><Arrow/></button>
            </Dropdown>
        );
    }
}

export default DropdownMenu;