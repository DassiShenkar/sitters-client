"use strict";
import React, { Component } from 'react';
import { View } from 'react-native';
import ParentForm from './ParentForm';
import SitterForm from './SitterForm';

var Register = React.createClass({
    render: function () {
        return (
            <View>
                {this.props.userType === "Parent" ?  <ParentForm/> : <SitterForm/>}
            </View>
        );

    }
});

export default Register;
