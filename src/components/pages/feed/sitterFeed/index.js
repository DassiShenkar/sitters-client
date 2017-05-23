//external sources
import React from 'react';
import axios from 'axios';
import InviteList from '../../../inviteList'
import strings from "../../../../static/strings";

//components

//style


class SitterFeed extends React.Component {
    componentWillMount() {
            let self = this;
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (!userId) {
            } else {
                axios({
                    method: 'post',
                    url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'sitter/get',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: {_id: userId}
                })
                    .then(function (sitter) {
                        if (sitter.data) {  // user exists
                            self.props.actions.settingsActions.setNotifications(sitter.data.settings.allowNotification);
                            self.props.actions.settingsActions.setSuggestions(sitter.data.settings.allowSuggestions);
                            self.props.actions.settingsActions.setShowOnSearch(sitter.data.settings.allowShowOnSearch);
                            self.props.actions.actionCreators.setSitterData(sitter.data);
                        }
                        else { // user not exist
                            self.props.router.push('/login');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

    }
    render() {
        return (
            <div id="sitter-feed">
                <InviteList isParent={this.props.user.isParent} invites={this.props.user.invites}/>
            </div>
        );
    }
}

export default SitterFeed;
