//external sources
import React from 'react';

//utils
import {request} from '../../../../../utils/requestHandler';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

export default class ParentFeedBase extends React.Component {s
    componentWillMount() {
        if (this.props.feed.matches.length === 0 && !('name' in this.props.user)) {
            this.props.actions.feedActions.setSpinnetText("Finding Sitters that Match your needs...");
            this.props.actions.feedActions.showSpinner(true);
            let self = this;
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (userId) {
                request('post', sittersApi.GET_USER, {_id: userId}, function(parent){
                    if (parent.data) {  // parent exists
                        self.props.actions.feedActions.showSpinner(true);
                        request('post', sittersApi.GET_MATCHES, parent.data, function(sitters){ // get matches from server
                            if (sitters.data.length > 0)
                                self.props.actions.feedActions.setMatches(sitters.data);
                            self.props.actions.feedActions.showSpinner(false);
                        });
                        self.props.actions.actionCreators.setParentData(parent.data);
                    }
                    else { // user not exist
                        self.props.router.push('/login');
                    }
                });
            }
        }
    }
}