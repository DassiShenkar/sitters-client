import React from 'react'
import Location from '../styles/icons/Location'
import Clock from '../styles/icons/Clock'
import Dollar from '../styles/icons/Dollar'
import Range from './RangeSlider'
import {Tabs, Tab} from 'react-bootstrap-tabs';
// import SitterList from './SitterList'
import GoogleMaps from './GoogleMaps'
import DatePicker from './controllers/DatePicker'
import TimeInput from './controllers/TimeInput'
import moment from 'moment'
class SearchByTab extends React.Component {
    constructor(props) {
        super(props);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    }

    // handleRangeValues(values){
    //     this.state = {
    //         minRange : values[0],
    //         maxRange : values[1],
    //     };
    //     let sitters = [];
    //     for(let sitter of this.props.sitters){
    //         if(sitter.hourFee >= values[0] && sitter.hourFee <= values[1])
    //             sitters.push(sitter);
    //     }
    //     this.setState({
    //         sitters : sitters,
    //     });
    //     this.refs.sitterList.state.sitters = sitters;
    // }
    handleDateTimeChange(){
        let day = this.refs.datePicker.state.day.toLowerCase();
        let from = this.refs.timePicker1.state.time;
        // let to = this.refs.timePicker2.state.time;
        let sitters = [];

        // let ms = moment(to,"HH:mm").diff(moment(from,"HH:mm"));
        // var d = moment.duration(ms);
        // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
        //console.log(s[0] === '-'? "notOk":'ok');
        for(let sitter of this.props.sitters){
            let startMS = moment(sitter.workingHours[day]['start'],"HH:mm").diff(moment(from,"HH:mm"));
            let startDuration = moment.duration(startMS);
            let startDiff = Math.floor(startDuration.asHours()) + moment.utc(startMS).format(":mm");
            console.log(sitter.name + "  " +  startDiff);
             // if(startDiff[0] !== '-'){
             //     console.log(startDiff);
            //     let finishMS = moment(to,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
            //     let finishDuration = moment.duration(finishMS);
            //     let finishDiff = Math.floor(finishDuration.asHours()) + moment.utc(finishMS).format(":mm");
            //     console.log(finishDiff);
            //     // if(finishDiff[0] !== '-'){
            //     //     sitters.push(sitter);
            //     // }
            // }
            //console.log(s[0] === '-'? "notOk":'ok');
            //let finishMS = moment(finish,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
            //let start = sitter.workingHours[day]['start'].split(':');
            //let finish = sitter.workingHours[day]['finish'].split(':');
            //if()
            // console.log(parseInt(start[0]));
            // console.log(parseInt(start[1]));

        }
        // this.setState({
        //     sitters : sitters,
        // });
        // this.refs.sitterList.state.sitters = sitters;
        // console.log(sitters.length);


    }
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    onSelect(index,label){
        this.props.actions.feedActions.setFilteredMatches(this.props.feed.matches); // when tab is pressed, init sitters frm filters
    }
    render() {
        return (
            <div>9
                <Tabs onSelect={(index, label) => this.onSelect(index,label)}>
                    <Tab label={<Location/>}>
                        <div style={{width: '400px', height: '400px'}}>
                         <GoogleMaps sitters={this.props.feed.matches}/>
                         </div>
                    </Tab>
                    <Tab label={<Clock/>}>
                        <p>Search by Time</p>
                        <DatePicker {...this.props} action={this.props.actions.searchByActions.changeInviteDate} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                        <p>From</p>
                        <TimeInput {...this.props} action={this.props.actions.searchByActions.changeInviteFromTime}/>
                        <p>To</p>
                        <TimeInput {...this.props} action={this.props.actions.searchByActions.changeInviteToTime}/>
                    </Tab>
                    <Tab label={<Dollar/>}>
                        <p>Hour Rare</p>
                        <Range min={0} max={50} {...this.props} action={this.props.actions.searchByActions.changeRange} changeSitters={this.props.actions.feedActions.setFilteredMatches}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default SearchByTab;
