import React from 'react';
import dateFormat from 'dateformat'
import 'rc-time-picker/assets/index.css';
class DatePickerBase extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value, formattedValue){
        this.props.action(formattedValue,dateFormat(value, "dddd"),value);
    }
}

export default DatePickerBase;
