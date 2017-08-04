// external sources
import React from 'react';
import TimePicker from 'rc-time-picker';
import TimeInputBase from '../../base/controllers/timePicker/index'

export default class TimeInput extends TimeInputBase {
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
