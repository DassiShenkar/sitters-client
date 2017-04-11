import React from 'react';
import DatePickerBoostrap from 'react-bootstrap-date-picker'
import DatePickerBase from '../../base/controllers/DatePickerBase'

class DatePicker extends DatePickerBase {
    render() {
        const today = new Date();
        return (
            <DatePickerBoostrap value={today.toISOString()} action={this.props.action} onChange={this.handleChange} />
        );
    }
}
// DatePicker.propTypes = {
//     changeDateTimeValues: React.PropTypes.func,
// };
export default DatePicker;
