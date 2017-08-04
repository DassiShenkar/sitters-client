//external sources
import React from 'react';

//utils
import {post} from '../../../../utils/serverCalls';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";
import * as _ from "lodash";

// statics
import strings from '../../../../static/strings';

export default class SitterListBase extends React.Component {

    constructor(props) {
        super(props);
        this.nextSitter = this.nextSitter.bind(this);
        this.prevSitter = this.prevSitter.bind(this);
    }

    nextSitter(e) {
        e.preventDefault();
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? this.props.feed.filteredMatches.length - 1 : this.props.feed.sitterIndex + 1;
        if (strings.ACTIVATE_BLACKLIST) {
            let parent = this.props.user;
            parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id); // add sitter to parent blacklist
            this.props.actions.actionCreators.setUserData(parent);
            post(sittersApi.UPDATE_PARENT, parent, _.noop); // update parent blacklist in db
        }
        this.props.actions.feedActions.setSitterIndex(index);
    }

    prevSitter(e) {
        e.preventDefault();
        const index = this.props.feed.sitterIndex === 0 ? 0 : this.props.feed.sitterIndex - 1;
        if (strings.ACTIVATE_BLACKLIST) {
            let parent = this.props.user;
            parent.blacklist.push(this.props.feed.matches[this.props.feed.sitterIndex]._id); // add sitter to parent blacklist
            this.props.actions.actionCreators.setUserData(parent);
            post(sittersApi.UPDATE_PARENT, parent, _.noop); // update parent blacklist in db
        }
        this.props.actions.feedActions.setSitterIndex(index);
    }
}