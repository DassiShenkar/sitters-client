//external sources
import React from 'react'

import {Nav, NavItem, PageHeader} from 'react-bootstrap';
import Range from './RangeSlider'
import GoogleMaps from './GoogleMaps';

//components
import Location from '../styles/icons/Location'
import Clock from '../styles/icons/Clock'
import Dollar from '../styles/icons/Dollar'
import DatePicker from './controllers/DatePicker';
import TimeInput from './controllers/TimeInput';

class SearchByTab extends React.Component {


    handleSelect(selectedKey) {
        this.props.actions.searchByActions.setView(selectedKey);
    }


    render() {
        let navView = null;
        if (this.props.searchBy.searchView !== null) {
            let view = this.props.searchBy.searchView;
            if (view === "location") {
                navView = <div style={{width: '400px', height: '400px'}}><GoogleMaps sitters={this.props.feed.matches}/>
                </div>;
            }
            else if (view === "time") {
                navView = <div>
                    <p>Search by Time</p>
                    <DatePicker defaultValue={this.props.searchBy.isoValue} {...this.props}
                                action={this.props.actions.searchByActions.changeInviteDate}
                                changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    <p>From</p>
                    <TimeInput defaultValue={this.props.searchBy.fromTime} {...this.props}
                               action={this.props.actions.searchByActions.changeInviteFromTime}
                               changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    <p>To</p>
                    <TimeInput defaultValue={this.props.searchBy.toTime} {...this.props}
                               action={this.props.actions.searchByActions.changeInviteToTime}
                               changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                </div>;
            }
            else if (view === "rate") {
                navView = <div>
                    <p>Hour Rate</p>
                    <Range min={0} max={50} {...this.props} action={this.props.actions.rangeActions.changeRange}
                           changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
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
