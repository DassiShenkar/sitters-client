// external sources
import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {Navbar, PageHeader} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

//components
import BackArrow from '../../../styles/icons/BackArrow';

// function onChange(value) {
//     console.log(value);
// }


class Settings extends React.Component {
    // constructor(props){
    //     super(props);
    //         this.props.actions.settingsActions.setNotifications(props.user.settings.allowNotification);
    //         this.props.actions.settingsActions.setSuggestions(props.user.settings.allowSuggestions);
    // }
    handleApplyChanges(e) {
        e.preventDefault();
        let parent = this.props.user;
        parent.settings = {
            allowNotification: this.props.settings.enableNotifications,
            allowSuggestions: this.props.settings.enableSuggestions
        };
        let self = this;
        axios({
            method: 'post',
            // url: 'http://localhost:4444/parent/update',
            url: 'https://sitters-server.herokuapp.com/parent/update',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: parent
        }).then(function (res) {
            if (res.data) {  // user created
                console.log('updated settings');
                self.props.router.push('/');
            }
            else {
                console.log("settings not updated");
                //TODO: think about error
            }
        })
            .catch(function (error) {
                alert(error);
                //TODO: think about error
            });
    }

    handleNotificationChange(e) {
        this.props.actions.settingsActions.setNotifications(e.target.checked);
    }

    handleSuggestionsChange(e) {
        this.props.actions.settingsActions.setSuggestions(e.target.checked);
    }

    render() {
        return (
            <div id="settings-page">
                {/*<Navbar>*/}
                    {/*<Navbar.Header>*/}
                        {/*<Navbar.Brand>*/}
                            {/*<Link to='/'><BackArrow/>Settings</Link>*/}
                        {/*</Navbar.Brand>*/}
                    {/*</Navbar.Header>*/}
                {/*</Navbar>*/}
                <PageHeader>Settings</PageHeader>
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
