"use strict";

import React, { Component } from 'react';
import { ScrollView, View, ListView, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import AppBar from '../components/AppBar'
import NotificationItem from '../components/NotificationItem'
import * as actionCreators from '../../src/actions/actionCreators';

class Notifications extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.props.user.notifications);
        return (
            <ScrollView>
                <View>
                    <AppBar
                        {...this.props} />
                    {
                        this.props.user.invites.length > 0 ?
                        <ListView
                            dataSource={dataSource}
                            renderRow={(data) => <NotificationItem {...data} />}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        /> :
                        <Text style={styles.text}>No Notifications</Text>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    text: {
        color: '#f7a1a1',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        marginLeft: 10,
        alignSelf: 'center',
        marginTop: 100,
        fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);