"use strict";

var React = require('react');
var ReactNative = require('react-native');
var {
    TimePickerAndroid,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} = ReactNative;

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
            <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'simple', {})}>
                <Text style={styles.text}>{this.state.simpleText}</Text>
            </TouchableWithoutFeedback>
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