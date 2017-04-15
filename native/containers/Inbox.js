"use strict";

import React, { Component } from 'react';
import { ScrollView, View, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

import ListItem from '../components/ListItem'

export default class Inbox extends React.Component {

    constructor (props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{
                id: 0,
                name: 'Michael',
                msg: 'Pending invitation',
                date: '12/04/17',
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                onPress: this._onPress
            }, {
                id: 1,
                name: 'Michael',
                msg: 'Pending invitation',
                date: '12/04/17',
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                onPress: this._onPress
            }, {
                id: 2,
                name: 'Michael',
                msg: 'Pending invitation',
                date: '12/04/17',
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                onPress: this._onPress
            }])
        };
    }

    render () {
        return (
            <ScrollView>
                <View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) => <ListItem {...data} />}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                </View>
            </ScrollView>
        );
    }

    _onPress () {
        Actions.Suggested();
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});