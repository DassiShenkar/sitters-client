// external sources
import React from 'react';
import dateFormat from 'dateformat';
import moment from "moment";

// style
import 'rc-time-picker/assets/index.css';

export default class DatePickerBase extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    getAvailableSitters() {
        let day = this.props.searchBy.inviteDay.toLowerCase();
        let from = this.props.searchBy.fromTime.format('H:mm');
        let to = this.props.searchBy.toTime.format('H:mm');
        let sitters = [];
        for (let sitter of this.props.feed.matches) {
            let startMS = moment(sitter.workingHours[day]['start'], "HH:mm").diff(moment(from, "HH:mm"));
            let startDuration = moment.duration(startMS);
            let startDiff = Math.floor(startDuration.asHours()) + moment.utc(startMS).format(":mm");
            if (startDiff[0] === '-' || startDiff[0] === '0:00') {
                let finishMS = moment(to, "HH:mm").diff(moment(sitter.workingHours[day]['finish'], "HH:mm"));
                let finishDuration = moment.duration(finishMS);
                let finishDiff = Math.floor(finishDuration.asHours()) + moment.utc(finishMS).format(":mm");
                if (finishDiff[0] === '-') {
                    sitters.push(sitter);
                }
            }
        }
        if (this.props.changeSitters) {
            this.props.changeSitters(sitters);
        }
    }

    handleChange(value, formattedValue) {
        if (this.props.action) {
            this.props.action(formattedValue, dateFormat(value, "dddd"), value);
            this.getAvailableSitters();
        }
    }
}

