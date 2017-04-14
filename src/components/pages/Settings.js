import React from 'react';
import {Link} from 'react-router';

import {Navbar} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import BackArrow from '../../styles/icons/BackArrow';

// function onChange(value) {
//     console.log(value);
// }


class Settings extends React.Component {

    handleApplyChanges(e) {
        e.preventDefault();
        let self = this;
        //update user settings in db
    }

    handleNotificationChange(e) {
        this.props.actions.settingsActions.setNotifications(e.target.checked);
    }

    handleSuggestionsChange(e) {
        this.props.actions.settingsActions.setSuggestions(e.target.checked);
    }

    render() {
        // let form = this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props}/> : <SitterForm {...this.props}/>;
        return (
            <div id="settings-page">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'><BackArrow/>Settings</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <form id="settings-form" onSubmit={this.handleApplyChanges.bind(this)}>
                        <label htmlFor="notifications-switch">Allow Notifications
                            <Toggle
                                defaultChecked={this.props.settings.enableNotifications}
                                onChange={this.handleNotificationChange.bind(this)}
                            />
                        </label>
                        <label htmlFor="suggestions-switch">Allow Suggestions
                            <Toggle
                                defaultChecked={this.props.settings.enableSuggestions}
                                onChange={this.handleSuggestionsChange.bind(this)}
                            />
                        </label>
                        <input type="submit" className="submit-settings" value="Apply Changes"/>
                </form>
            </div>
        );
    }
}
export default Settings;
