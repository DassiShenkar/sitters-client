"use strict";
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';

import ParentForm from '../components/ParentForm';
import SitterForm from '../components/SitterForm';
import * as actionCreators from '../../src/actions/actionCreators';

class Register extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        alert(this.props.user.userType);
        return (
            <ScrollView>
                {this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props} /> : <SitterForm {...this.props} />}
            </ScrollView>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
