import React from 'react';
import TimePicker from 'rc-time-picker';
import TimeInputBase from '../base/controllers/timePickerBase/index'
class TimeInput extends TimeInputBase {
    render() {
        return (
            <TimePicker
                showSecond={false}
                defaultValue={this.props.defaultValue}
                onChange={this.onChange}
            />
        );
    }
}
export default TimeInput;
