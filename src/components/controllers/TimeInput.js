import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import TimeInputBase from '../../base/controllers/TimeInputBase'
class TimeInput extends TimeInputBase {
    render() {
        return (
            <TimePicker
                showSecond={false}
                defaultValue={moment()}
                className="xxx"
                onChange={this.onChange}

            />
        );
    }
}
// TimeInput.propTypes = {
//     changeDateTimeValues: React.PropTypes.func,
// };
export default TimeInput;
