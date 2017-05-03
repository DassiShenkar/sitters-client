"use strict";
import React, { Component } from 'react';
import { ScrollView, View, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import ListItem from '../components/ListItem'
import * as actionCreators from '../../src/actions/actionCreators';

class Inbox extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.props.user.invites);
        return (
            <ScrollView>
                <View>
                    <ListView
                        dataSource={dataSource}
                        renderRow={(data) => <ListItem {...data} />}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
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