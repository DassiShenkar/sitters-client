import React from 'react'
import Location from '../styles/icons/Location'
import Clock from '../styles/icons/Clock'
import Dollar from '../styles/icons/Dollar'
import Range from './RangeSlider'
import {Tabs, Tab} from 'react-bootstrap-tabs';
import GoogleMaps from './GoogleMaps'
import DatePicker from './controllers/DatePicker'
import TimeInput from './controllers/TimeInput'
class SearchByTab extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Tabs>
                    <Tab label={<Location/>}>
                        <div style={{width: '400px', height: '400px'}}>
                         <GoogleMaps sitters={this.props.feed.matches}/>
                         </div>
                    </Tab>
                    <Tab label={<Clock/>}>
                        <p>Search by Time</p>
                        <DatePicker defaultValue={this.props.searchBy.isoValue} {...this.props} action={this.props.actions.searchByActions.changeInviteDate} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                        <p>From</p>
                        <TimeInput defaultValue={this.props.searchBy.fromTime} {...this.props} action={this.props.actions.searchByActions.changeInviteFromTime} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                        <p>To</p>
                        <TimeInput defaultValue={this.props.searchBy.toTime} {...this.props} action={this.props.actions.searchByActions.changeInviteToTime} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </Tab>
                    <Tab label={<Dollar/>}>
                        <p>Hour Rare</p>
                        <Range min={0} max={50} {...this.props} action={this.props.actions.rangeActions.changeRange} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default SearchByTab;
