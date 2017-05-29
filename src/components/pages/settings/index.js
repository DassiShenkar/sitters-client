// external sources
import React from 'react';
import axios from 'axios';
import {Button, PageHeader} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import strings from "../../../static/strings";
import './style.css'

class Settings extends React.Component {
    handleApplyChanges(e) {
        e.preventDefault();
        let user = this.props.user;
        if(this.props.user.isParent)
            user.settings = {
                allowNotification: this.props.settings.enableNotifications,
                allowSuggestions: this.props.settings.enableSuggestions
            };
        else
            user.settings = {
                allowNotification: this.props.settings.enableNotifications,
                allowShowOnSearch: this.props.settings.enableShowOnSearch
            };
        let self = this;
        const path = this.props.user.isParent? 'parent/update': 'sitter/update';
        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + path,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: user
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

    handleShowOnSearchChange(e) {
        this.props.actions.settingsActions.setShowOnSearch(e.target.checked);
    }

    render() {
        console.log(this.props.user);
        const suggestion = this.props.user.isParent?
            <label htmlFor="suggestions-switch">Allow Suggestions
                <Toggle
                    defaultChecked={this.props.settings.enableSuggestions}
                    onChange={this.handleSuggestionsChange.bind(this)}
                />
            </label>: null;
        const showOnSearch = !this.props.user.isParent?
            <label htmlFor="showOnSearch-switch">Show on search
                <Toggle
                    defaultChecked={this.props.settings.enableShowOnSearch}
                    onChange={this.handleShowOnSearchChange.bind(this)}
                />
            </label> : null;
        return (
            <div id="settings-page" className="page">
                <PageHeader>Settings</PageHeader>
                <form id="settings-form" onSubmit={this.handleApplyChanges.bind(this)}>
                    <label htmlFor="notifications-switch">Allow Notifications
                        <Toggle
                            defaultChecked={this.props.settings.enableNotifications}
                            onChange={this.handleNotificationChange.bind(this)}
                        />
                    </label>
                    {suggestion}
                    {showOnSearch}
                    <Button className="submit-settings" title="Send Review" bsStyle="primary" onClick={this.handleApplyChanges.bind(this)}>Apply Changes</Button>
                </form>
            </div>
        );
    }
}
export default Settings;
