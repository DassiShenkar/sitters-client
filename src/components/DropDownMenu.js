import React from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import Arrow from '../styles/icons/Arrow'
import Person from '../styles/icons/Person'
import Settings from '../styles/icons/Settings'
import Logout from '../styles/icons/Logout'
import Information from '../styles/icons/Information'


class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onVisibleChange = this.onVisibleChange.bind(this);

    }

    onSelect({key}) {
        switch (key) {
            case "editProfile":
                this.props.router.push('/editProfile');
                break;
            case "settings":
                this.props.router.push('/settings');
                break;
            case "logout":
                localStorage.removeItem('auth_token');// delete the user information from the browser
                this.props.router.push('/login');
                break;
            case "about":
                this.props.router.push('/about');
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
                <MenuItem key="editProfile"><Person/>Edit Profile</MenuItem>
                <MenuItem key="settings"><Settings/>Settings</MenuItem>
                <MenuItem key="logout"><Logout/>Log Out</MenuItem>
                <MenuItem key="about"><Information/>About</MenuItem>
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