//external sources
import React from 'react';
import axios from 'axios';

import {PageHeader} from 'react-bootstrap';

//components
// import Nav from '../../panels/nav/index'; Do not delete until check nav functionality
import SearchByTab from "../../panels/searchPanel/index";
import Notifications from "../../Notifications";
import Invites from "../../inviteList/index";
import SitterList from "../../sitterList/index";
import SitterActionBar from "../../panels/actionPanel/index";

//style
import './style.css';

class Feed extends React.Component {

    componentWillMount() {
        let self = this;
        const userId = localStorage.getItem('auth_token');
        if (userId) {
            axios({
                method: 'post',
                url: 'https://sitters-server.herokuapp.com/parent/get',
                // url: 'http://localhost:4444/parent/get',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: userId
            })
                .then(function (parent) {
                    if (parent.data) {  // user exists
                        self.props.actions.settingsActions.setNotifications(parent.data.settings.allowNotification);
                        self.props.actions.settingsActions.setSuggestions(parent.data.settings.allowSuggestions);

                        axios({
                            method: 'post',
                            url: 'https://sitters-server.herokuapp.com/parent/getMatches',
                            // url: 'http://localhost:4444/parent/getMatches',
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
            else if (view === "notifications") {
                showSitters = false;
                navView = <Notifications {...this.props} />
            }
            else if (view === "invites") {
                showSitters = false;
                navView = <Invites {...this.props} />
            }
            else {
                showSitters = true;
                navView = <PageHeader>Sitters</PageHeader>;
            }
        }

        return (
            <div id="feed-page">
                {/*DO NOT delete until check all nav functionality*/}
                {/*<Nav name={this.props.user.name}*/}
                     {/*image={this.props.user.profilePicture}*/}
                     {/*alt={this.props.user.name}*/}
                     {/*invites={this.props.user.invites}*/}
                     {/*notifications={this.props.user.notifications}*/}
                     {/*action={this.props.actions.feedActions.setNavView}*/}
                     {/*{...this.props}/>*/}
                {navView}
                {showSitters ? <SitterList {...this.props}
                                           sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/> : ""}

                {showSitters ? this.props.feed.filteredMatches.length > 0 ?
                        <SitterActionBar {...this.props}/> : '' : ''}
            </div>
        );
    }
}

export default Feed;
