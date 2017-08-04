//external sources
import React from 'react';

//utils
import {post} from '../../../../../utils/serverCalls';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

export default class ParentFeedBase extends React.Component {s
    componentWillMount() {
        if (this.props.feed.matches.length === 0) {
            this.props.actions.feedActions.setSpinnetText("Finding Sitters that Match your needs...");
            this.props.actions.feedActions.showSpinner(true);
            let self = this;
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (userId) {
                post(sittersApi.GET_PARENT, {_id: userId}, function(parent){
                    if (parent.data) {  // parent exists
                        self.props.actions.feedActions.showSpinner(true);
                        post(sittersApi.GET_MATCHES, parent.data, function(sitters){ // get matches from server
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