//external sources
import React from 'react'

import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import Range from '../../controllers/range/index'
import GoogleMaps from '../../controllers/maps/GoogleMaps';

//components
import Location from '../../icons/Location'
import Clock from '../../icons/Clock'
import Dollar from '../../icons/Dollar'
import DatePicker from '../../controllers/datePicker/index';
import TimeInput from '../../controllers/TimeInput';

//style
import './style.css';
import RadioGroup from "../../controllers/radio/radioGroup/index";
import strings from "../../../static/strings";

class SearchByTab extends React.Component {


    handleSelect(selectedKey) {
        this.props.actions.searchByActions.setView(selectedKey);
    }


    render() {
        let navView = null;
        if (this.props.searchBy.searchView !== null) {
            let view = this.props.searchBy.searchView;
            const searchByTime = this.props.searchBy.availability !== "Available Now"?
                <section>
                    <label>Date
                        <DatePicker defaultValue={this.props.searchBy.isoValue} {...this.props}
                                    action={this.props.actions.searchByActions.changeInviteDate}
                                    changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </label>
                    <label>Start Time
                        <TimeInput defaultValue={this.props.searchBy.fromTime} {...this.props}
                                   action={this.props.actions.searchByActions.changeInviteFromTime}
                                   changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </label>
                    <label>End Time
                        <TimeInput defaultValue={this.props.searchBy.toTime} {...this.props}
                                   action={this.props.actions.searchByActions.changeInviteToTime}
                                   changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </label>
                </section>: null;

            if (view === "location") {
                navView = <div className="google-map" style={{width: '100%', height: '240px'}}>
                    <GoogleMaps sitters={this.props.feed.matches}/></div>;
            }
            //<GoogleMaps center={{lat: this.props.user.address? this.props.user.address.latitude: 0,lng: this.props.user.address? this.props.user.address.longitude: 0}}*/}
            ///*sitter={this.props.user}*/}
            ///*oneMarker={true}/>*/}  // FIX THIS
            else if (view === "time") {

                navView = <form id="time-search">
                    <RadioGroup options={strings.AVAILABILITY}
                                defaultValue={this.props.searchBy.availability}
                                action={this.props.actions.searchByActions.changeAvailability}
                                radioType={'availability'}
                                value={this.props.searchBy.availability}/>
                    {searchByTime}
                </form>;
            }
            else if (view === "rate") {
                navView = <div id="range-search">
                    <label>Hour Rate
                        <Range min={0} max={50} {...this.props} action={this.props.actions.rangeActions.changeRange}
                               changeSitters={this.props.actions.feedActions.setFilteredMatches} disabled={false}/>
                    </label>
                </div>
            }
            return (
                <div id="search-panel">
                    <PageHeader>Quick Search</PageHeader>
                    <Nav justified onSelect={this.handleSelect.bind(this)}>
                        <NavItem eventKey="location" title="location"><Location/></NavItem>
                        <NavItem eventKey="time"><Clock/></NavItem>
                        <NavItem eventKey="rate"><Dollar/></NavItem>
                    </Nav>
                    {navView}
                </div>
            );
        }
    }
}

export default SearchByTab;
