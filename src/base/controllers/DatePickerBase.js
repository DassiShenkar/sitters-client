import React from 'react';
import dateFormat from 'dateformat'
import 'rc-time-picker/assets/index.css';
class DatePickerBase extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value:  new Date().toISOString()
        }
    }
    handleChange(value, formattedValue){
        this.props.action(formattedValue,dateFormat(value, "dddd"));
        // this.setState({
        //     value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
        //     formattedValue: formattedValue, // Formatted String, ex: "11/19/2016"
        //     day: dateFormat(value, "dddd") // dddd = the full day of the week
        // },
        //     this.props.changeDateTimeValues
        // );

    }
}

export default DatePickerBase;
