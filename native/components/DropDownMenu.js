import React, { Component } from 'react'
import { Picker, StyleSheet } from 'react-native';

const Item = Picker.Item;

export default class DropDownMenu extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selected2: 'key1',
            color: 'red',
            mode: Picker.MODE_DROPDOWN,
        };
    }

    render () {
        return (
            <Picker
                style={styles.picker}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange.bind(this, 'selected2')}
                mode="dropdown">
                <Item label="Edit Profile" value="key0" />
                <Item label="Settings" value="key1" />
                <Item label="Log Out" value="key2" />
                <Item label="About" value="key3" />
            </Picker>
        );
    }

    onValueChange = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    };
}

var styles = StyleSheet.create({
    picker: {
        width: 100,
    },
});