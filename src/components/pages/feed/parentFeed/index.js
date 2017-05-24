//external sources
import React from 'react';
import axios from 'axios';

//components

import Loadable from 'react-loading-overlay';
import Review from "../../../review/index";
import strings from "../../../../static/strings";
import SearchByTab from "../../../panels/searchPanel/index";
import SitterList from "../../../sitterList/index";
import InvitesModal from "../../../inviteList/inviteModal/index";
import Notifications from "../../../notifications/index";

//style
import './style.css';

class ParentFeed extends React.Component {

    componentWillMount() {
        if (this.props.feed.matches.length === 0) {

            this.props.actions.feedActions.setSpinnetText("Finding Sitters that Match your needs...");
            this.props.actions.feedActions.showSpinner(true);
            let self = this;
            // const userId = localStorage.getItem('auth_token');
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (!userId) {
            } else {
                axios({
                    method: 'post',
                    url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'parent/get',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    data: {_id: userId}
                })
                    .then(function (parent) {
                        if (parent.data) {  // user exists
                            self.props.actions.feedActions.showSpinner(true);
                            self.props.actions.settingsActions.setNotifications(parent.data.settings.allowNotification);
                            self.props.actions.settingsActions.setSuggestions(parent.data.settings.allowSuggestions);

                            axios({
                                method: 'post',
                                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'parent/getMatches',
                                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                                data: parent.data
                            })
                                .then(function (sitters) {
                                    if (sitters.data.length > 0) {
                                        self.props.actions.feedActions.setMatches(sitters.data);
                                    }
                                    else {
                                        console.log('no matches found');
                                    }
                                    self.props.actions.feedActions.showSpinner(false);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            self.props.actions.actionCreators.setUserData(parent.data);
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
    }

    render() {
        let navView = null;
        let showSitters = true;
        if (this.props.feed.navView !== null) {
            let view = this.props.feed.navView;
            if (view === "searchBy") {
                showSitters = true;
                navView = <SearchByTab {...this.props} sitters={this.props.user.sitters}/>;
            }
            else {
                showSitters = true;
            }
        }

        return (
            <div id="parent-feed">
                <Loadable
                    active={this.props.feed.showSpinner}
                    spinner
                    text={this.props.feed.spinnerText}
                >
                    {navView}
                    {showSitters ? <SitterList {...this.props}
                                               sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/> : ""}
                    <InvitesModal {...this.props} />
                    <Notifications {...this.props}/>
                    <Review {...this.props} />
                </Loadable>
            </div>
        );
    }
}

export default ParentFeed;
