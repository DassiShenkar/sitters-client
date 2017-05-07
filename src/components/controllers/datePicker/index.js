import React from 'react';
import DatePickerBoostrap from 'react-bootstrap-date-picker'
import DatePickerBase from '../../base/controllers/datePickerBase/index'

class DatePicker extends DatePickerBase {
    render() {
        return (
            <DatePickerBoostrap value={this.props.defaultValue} action={this.props.action} onChange={this.handleChange} />
        );
    }
}
export default DatePicker;
