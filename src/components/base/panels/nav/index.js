//external sources
import React from 'react';
import {browserHistory} from 'react-router';
import * as _ from "lodash";

//style
import './style.css';

export default class MainNavBase extends React.Component {
    componentWillMount(){
        const self = this;
        navigator.serviceWorker.addEventListener('message', function(event) {// add listener to message from the server
            let object = JSON.parse(event.data);
            if("parentID" in object && self.props.user.name){
                if(object.status !== 'waiting') { // update invite - got new invite
                    let invites = self.props.user.invites;
                    invites.forEach(invite => {
                        if(invite._id === object._id) {
                            invite.status = object.status;
                            invite.wasRead = false;
                        }
                    });
                    self.props.actions.actionCreators.setInvites(invites);
                }
                else
                    self.props.actions.actionCreators.setInvites(self.props.user.invites.concat(object)); // new invite
            }
            else if(!("parentID" in object.notification && self.props.user.name) && ("sitterID" in object.notification && self.props.user.name)){ // new notification - new sitter in town
                self.props.actions.actionCreators.setNotifications(self.props.user.notifications.concat(object.notification)); // add new notification to state
                let matches = self.props.feed.matches;
                matches.push(object.sitter);
                matches = _.orderBy(matches, ['matchScore'], ['desc']); // add the new sitter to parent matches and sorting by matchScore
                const index = _.findIndex(matches, function(o) { return o._id === object.sitter._id; });
                self.props.actions.feedActions.setMatches(matches);
                self.props.actions.feedActions.setFilteredMatches(matches);
                self.props.actions.feedActions.setSitterIndex(index);
            }
        });
    }
    nav(view) {
        this.props.router.getCurrentLocation().pathname === '/'? this.props.action(view):browserHistory.goBack(); // go back to last page the user visited
    }
}