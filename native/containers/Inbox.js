"use strict";
import React, { Component } from 'react';
import { ScrollView, View, ListView, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import ListItem from '../components/ListItem'
import AppBar from '../components/AppBar'
import * as actionCreators from '../../src/actions/actionCreators';

class Inbox extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const self = this;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.props.user.invites);
        return (
            <ScrollView>
                <View>
                    <AppBar
                        {...this.props} />
                    {
                        this.props.user.invites.length > 0 ?
                        <ListView
                            dataSource={dataSource}
                            renderRow={(data) => <ListItem {...data} userType={self.props.user.userType} />}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        /> :
                        <Text style={styles.text}>No Invites</Text>
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
        backgroundColor: '#8E8E8E'
    },
    text: {
        color: '#f7a1a1',
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);