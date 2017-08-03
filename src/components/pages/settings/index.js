//external sources
import React from 'react';

//components
import {Button, PageHeader} from 'react-bootstrap';
import Toggle from 'react-toggle';
import SettingsBase from "../../base/pages/settings/index";

//style
import 'react-toggle/style.css';
import './style.css'

export default  class Settings extends SettingsBase {
    render() {
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
