// external sources
import React from 'react';
import moment from "moment";

//style
import 'rc-time-picker/assets/index.css';

export default class TimeInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(value) {
        if(this.props.action){
            this.props.action((value));
            let day = this.props.searchBy.inviteDay.toLowerCase();
            let from = this.props.searchBy.fromTime.format('H:mm');
            let to = this.props.searchBy.toTime.format('H:mm');
            let sitters = [];
            for(let sitter of this.props.feed.matches){
                let startMS = moment(sitter.workingHours[day]['start'],"HH:mm").diff(moment(from,"HH:mm"));
                let startDuration = moment.duration(startMS);
                let startDiff = Math.floor(startDuration.asHours()) + moment.utc(startMS).format(":mm"); // start time difference
                if(startDiff[0] === '-' || startDiff[0] === '0:00'){
                    let finishMS = moment(to,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
                    let finishDuration = moment.duration(finishMS);
                    let finishDiff = Math.floor(finishDuration.asHours()) + moment.utc(finishMS).format(":mm"); // end time difference
                    if(finishDiff[0] === '-'){
                        sitters.push(sitter);
                    }
                }
            }
            if(this.props.changeSitters)
                this.props.changeSitters(sitters);
        }
    }
}