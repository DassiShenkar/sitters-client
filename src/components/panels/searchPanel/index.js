//external sources
import React from 'react'

//components
import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import Range from '../../controllers/range/index'
import DatePicker from '../../controllers/datePicker/index';
import RadioGroup from "../../controllers/radio/index";
import GoogleMaps from "../../controllers/googleMaps/index";
import CheckBoxInput from "../../controllers/checkbox/index";
import SearchByBase from "../../base/panels/searchPanel/index";

//icons
import Location from '../../icons/Location'
import Clock from '../../icons/Clock'
import Dollar from '../../icons/Dollar'

//statics
import strings from "../../../static/strings";

//style
import './style.css';

export default class SearchBy extends SearchByBase {
    render() {
        let navView = null;
        if (this.props.searchBy.searchView !== null) {
            let view = this.props.searchBy.searchView;
            const searchByTime = this.props.searchBy.availability !== "Available Now" ?
                <section className="page">

                    <label>Date
                        <DatePicker defaultValue={this.props.searchBy.isoValue} {...this.props}
                                    action={this.props.actions.searchByActions.changeInviteDate}
                                    changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </label>
                    <label>Time</label>
                    <CheckBoxInput {...this.props}
                                   filterMatches={true}
                                   types={strings.HOURS}
                                   action={this.props.actions.searchByActions.changeWorkingHours}
                                   name="working-hours"
                                   changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                </section> : null;

            if (view === "location") {
                navView = <div style={{width: '100%', height: '400px'}}>
                    <label>Proximity</label>
                    <GoogleMaps {...this.props}
                        center={{
                        lat: this.props.user.address ? this.props.user.address.latitude : 0,
                        lng: this.props.user.address ? this.props.user.address.longitude : 0
                    }}
                    zoom="14"
                    sitters={this.props.feed.matches}/>
                </div>
            }
            else if (view === "time") {
                navView = <form id="time-search" className="page">
                    <RadioGroup options={strings.AVAILABILITY}
                                defaultValue={this.props.searchBy.availability}
                                action={this.props.actions.searchByActions.changeAvailability}
                                radioType={'availability'}
                                value={this.props.searchBy.availability}/>
                    {searchByTime}
                </form>;
            }
            else if (view === "rate") {
                navView = <div id="range-search" className="page">
                    <label>Hour Rate
                        <Range min={0} max={50} {...this.props} action={this.props.actions.rangeActions.changeRange}
                               changeSitters={this.props.actions.feedActions.setFilteredMatches} disabled={false}/>
                    </label>
                </div>
            }
            return (
                <div id="search-panel">
                    <div className="search-nav">
                        <PageHeader>Quick Search</PageHeader>
                        <Nav justified onSelect={this.handleSelect.bind(this)}>
                            <NavItem className={this.props.searchBy.searchView === "time"? "active-search-by":""} eventKey="time"><Clock/></NavItem>
                            <NavItem className={this.props.searchBy.searchView === "location"? "active-search-by":""} eventKey="location" title="location"><Location/></NavItem>
                            <NavItem className={this.props.searchBy.searchView === "rate"? "active-search-by":""} eventKey="rate"><Dollar/></NavItem>
                        </Nav>
                        {navView}
                    </div>
                </div>
            );
        }
    }
}