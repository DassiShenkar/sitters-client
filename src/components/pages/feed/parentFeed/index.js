//external sources
import React from 'react';

//components
import ParentFeedBase from "../../../base/pages/feed/parentFeed/index";
import Loadable from 'react-loading-overlay';
import Review from "../../../review/index";
import SearchByTab from "../../../panels/searchPanel/index";
import SitterList from "../../../sitterList/index";

//style
import './style.css';

export default class ParentFeed extends ParentFeedBase {
    render() {
        let navView = null;
        let showSitters = true;
        if (this.props.feed.navView !== null) {
            let view = this.props.feed.navView;
            if (view === "searchBy") {
                showSitters = true;
                navView = <SearchByTab {...this.props} sitters={this.props.user.sitters}/>;
            }
            else
                showSitters = true;
        }
        return (
            <div id="parent-feed">
                <Loadable
                    active={this.props.feed.showSpinner}
                    spinner
                    text={this.props.feed.spinnerText}
                >
                    {navView}
                    {showSitters &&  this.props.searchBy.searchView !== "location" ? <SitterList {...this.props}
                                               sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/> : ""}
                    <Review {...this.props} />
                </Loadable>
            </div>
        );
    }
}