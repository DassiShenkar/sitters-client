//external sources
import React from 'react';
import axios from 'axios';

import {PageHeader} from 'react-bootstrap';

//components
// import Nav from '../../panels/nav/index'; Do not delete until check nav functionality
import SearchByTab from "../../panels/searchPanel/index";
import Notifications from "../../notifications/index";
import Invites from "../../inviteList/index";
import SitterList from "../../sitterList/index";
import SitterActionBar from "../../panels/actionPanel/index";

//style
import './style.css';
import Rating from "react-rating";
import Review from "../../review/index";
import strings from "../../../static/strings";

class Feed extends React.Component {

    componentWillMount() {
        let self = this;
        const userId = localStorage.getItem('auth_token');
        if (!userId) {
        } else {
            axios({
                method: 'post',
                url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/get',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: userId}
            })
                .then(function (parent) {
                    if (parent.data) {  // user exists
                        self.props.actions.settingsActions.setNotifications(parent.data.settings.allowNotification);
                        self.props.actions.settingsActions.setSuggestions(parent.data.settings.allowSuggestions);

                        axios({
                            method: 'post',
                            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'parent/getMatches',
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
            <div id="feed-page" className="page">
                {navView}
                {showSitters ? <SitterList {...this.props}
                                           sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/> : ""}
                <Invites {...this.props} />
                <Notifications {...this.props}/>
                <Review {...this.props} />
            </div>
        );
    }
}

export default Feed;
