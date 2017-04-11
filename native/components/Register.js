"use strict";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ParentForm from './ParentForm';
import SitterForm from './SitterForm';

export default class Register extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView>
                {alert(params.userType)}
                {params.userType === "Parent" ?  <ParentForm {...this.props} /> : <SitterForm {...this.props} />}
            </ScrollView>
        );

    }
}
