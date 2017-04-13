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
                onChange={this.onChange}
            />
        );
    }
}
export default TimeInput;
