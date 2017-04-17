"use strict";

var React = require('react');
var ReactNative = require('react-native');
var {
    TimePickerAndroid,
    StyleSheet,
    Text,
    TouchableOpacity
} = ReactNative;
import TextButton from './TextButton';

class AndroidTimePicker extends React.Component {
    static title = 'TimePickerAndroid';

    state = {
        simpleText: 'pick a time'
    };

    showPicker = async (stateKey, options) => {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
                this.props.callback(this.props.day, _formatTime(hour, minute));
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render() {
        return (
            <TextButton
                onPress={this.showPicker.bind(this, 'simple', {})}
                text={this.state.simpleText}
                styles={styles.text} />
        );
    }
}

/**
 * Returns e.g. '3:05'.
 */
function _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
    text: {
        color: 'black'
    }
});

export default AndroidTimePicker;