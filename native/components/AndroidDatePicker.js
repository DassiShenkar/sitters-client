'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    DatePickerAndroid,
    StyleSheet,
    Text,
    TouchableOpacity,
} = ReactNative;

class AndroidDatePicker extends React.Component {
    static title = 'DatePickerAndroid';
    static description = 'Standard Android date picker dialog';

    state = {
        calendarDate: new Date(2020, 4, 5),
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
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.showPicker.bind(this, 'calendar', {date: this.state.calendarDate, mode: 'calendar'})}>
                <Text style={styles.text}>{this.state.calendarText}</Text>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});

module.exports = AndroidDatePicker;