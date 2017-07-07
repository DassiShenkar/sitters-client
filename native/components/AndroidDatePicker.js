'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    DatePickerAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
} = ReactNative;
import TextButton from './TextButton'

export default class AndroidDatePicker extends React.Component {
    static title = 'DatePickerAndroid';

    state = {
        calendarDate: new Date(),
        calendarText: 'pick a date'
    };

    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
                this.props.pickerCallback(date);
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render() {
        return (
            <TextButton
                onPress={this.showPicker.bind(this, 'calendar', {date: this.state.calendarDate, mode: 'calendar'})}
                text={this.state.calendarText}
                styles={styles.text} />
        );
    }
}

var styles = StyleSheet.create({
    text: {
        color: '#f86966'
    }
});

