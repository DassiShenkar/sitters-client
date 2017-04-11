import React from 'react';
import DatePickerBoostrap from 'react-bootstrap-date-picker'
import DatePickerBase from '../../base/controllers/DatePickerBase'

class DatePicker extends DatePickerBase {
    render() {
        return (
            <DatePickerBoostrap value={this.state.value} onChange={this.handleChange} />
        );
    }
}
// DatePicker.propTypes = {
//     changeDateTimeValues: React.PropTypes.func,
// };
export default DatePicker;
