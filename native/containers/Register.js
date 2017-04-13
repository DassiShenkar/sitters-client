"use strict";
import React, { Component } from 'react';
import { ScrollView, Navigator } from 'react-native';
import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';

export default class Register extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator} />
        );
    }
    
    renderScene () {
        return (
            <ScrollView>
                {alert(this.props.userType)}
                {this.props.userType === "Parent" ?  <ParentForm {...this.props} /> : <SitterForm {...this.props} />}
            </ScrollView>
        );

    }
}
