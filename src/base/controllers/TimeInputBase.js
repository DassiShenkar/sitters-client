import React from 'react';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
class TimeInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            now: moment().hour(0).minute(0),
            format : 'h:mm'
        }
    }
    onChange(value) {
        this.setState({
            time: (value && value.format('H:mm')).toString()
        });
    }

}

export default TimeInputBase;
