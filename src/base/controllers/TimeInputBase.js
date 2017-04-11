import React from 'react';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
class TimeInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        // this.state = {
        //     time: moment().format('HH:mm'),
        //     now: moment().hour(0).minute(0),
        //     format : 'h:mm'
        // }
    }
    onChange(value) {
       this.props.action((value && value.format('H:mm')).toString());
        // this.setState({
        //     time: (value && value.format('H:mm')).toString()
        // },
        //     this.props.changeDateTimeValues// setState callback
        // );

    }

}

export default TimeInputBase;
