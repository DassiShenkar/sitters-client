import RadioForm from 'react-native-simple-radio-button';
import { View } from 'react-native';
import React, { Component } from 'react';

export default class RadioButtons extends Component {

    render() {
        return (
            <RadioForm
                radio_props={this.props.values}
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value) => {this.setState({value:value})}}
            />
        );
    }
}