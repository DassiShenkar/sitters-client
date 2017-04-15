import React, { Component } from 'react'
import { StyleSheet, TouchebleHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'
import ModalDropdown from 'react-native-modal-dropdown';

const DROPDOWN_OPTIONS = ['Edit Profile', 'Settings', 'Log Out', 'About'];

export default class DropDownMenu extends React.Component {

    constructor (props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }

    render () {
        return (
            <ModalDropdown
                options={DROPDOWN_OPTIONS}
                onSelect={this._onSelect}/>
        );
    }

    logOut () {

    }

    _onSelect (idx, value) {
        switch(value) {
            case 'Edit Profile':
                Actions.Register({ exists:true });
                break;
            case 'Settings':
                Actions.Settings();
                break;
            case 'Log Out':
                this.logOut();
                break;
            case 'About':
                Actions.About();
                break;
        }
    }
}