"use strict";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ParentForm from './ParentForm';
import SitterForm from './SitterForm';

var Register = React.createClass({
    render: function () {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView>
                {alert(params.userType)}
                {params.userType === "Parent" ?  <ParentForm/> : <SitterForm/>}
            </ScrollView>
        );

    }
});

export default Register;
