"use strict";
import React, { Component } from 'react';
import { View, ListView, Modal, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
var FBLoginManager = require('NativeModules').FBLoginManager;

import MenuItem from '../components/MenuItem';
import * as RouterActions from '../actions/RouterActions';
import LocalStorage from '../utils/LocalStorage';

class Menu extends React.Component {
     
    constructor(props) {
        super(props);
        this.registerCallback = this.registerCallback.bind(this);
        this.settingsCallback = this.settingsCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
    }
    
    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows([
            {index: 1, name: 'Edit Profile', menuCallback:  this.registerCallback},
            {index: 2, name: 'Settings', menuCallback: this.settingsCallback},
            {index: 3, name: 'Log Out', menuCallback: this.logoutCallback},
            {index: 4, name: 'Close Menu', menuCallback: Actions.pop}
        ]);
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={true}
                onRequestClose={() => {Actions.pop()}}>
                <View style={ styles.background }>
                    <View style={ styles.container }>
                        <ListView
                            dataSource={dataSource}
                            renderRow={(data) => <MenuItem {...this.props} {...data} />}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
                    </View>
                </View>
            </Modal>
        );
    }

    registerCallback() {
        this.props.routerActions.changeValidFlag(true);
        this.props.routerActions.addScene('register');
        Actions.pop();
    }

    settingsCallback() {
        this.props.routerActions.changeValidFlag(true);
        this.props.routerActions.addScene('settings');
        Actions.pop();
    }

    logoutCallback() {
        LocalStorage.clearAll();
        FBLoginManager.logOut();
        console.log('logout');
        this.props.routerActions.changeValidFlag(true);
        this.props.routerActions.addScene('login');
        Actions.pop();
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        margin: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '50%',
        height: '32.8%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    }
});

function mapStateToProps(state) {
    return {
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);