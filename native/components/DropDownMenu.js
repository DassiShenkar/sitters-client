import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


export default class DropDownMenu extends React.Component {

    constructor (props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }

    render () {
        return (
            <Menu onSelect={this._onSelect}>
                <MenuTrigger>
                    <Text style={{ fontSize: 20 }}>&#8942;</Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption value={1}>
                        <Text>Edit Profile</Text>
                    </MenuOption>
                    <MenuOption value={2}>
                        <Text>Settings</Text>
                    </MenuOption>
                    <MenuOption value={3}>
                        <Text>Log Out</Text>
                    </MenuOption>
                    <MenuOption value={4}>
                        <Text>About</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }

    logOut () {

    }

    _onSelect (value) {
        switch(value) {
            case 1:
                Actions.Register({ registered: true });
                break;
            case 2:
                Actions.Settings();
                break;
            case 3:
                this.logOut();
                break;
            case 4:
                Actions.About();
                break;
        }
    }
}