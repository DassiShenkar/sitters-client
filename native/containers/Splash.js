import React, { Component } from 'react';
import { View, BackAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import axios from 'axios';

import LocalStorage from '../utils/LoaclStorage';
import Logo from '../components/Logo'
import * as actionCreators from '../../src/actions/actionCreators';


const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount () {
        var self = this;
        setTimeout(function() {
            self.ifExists();
        }, 1000);
    }

    render() {
        return (
            <View>
                <Logo
                    companyName='Sitters' />
            </View>
        );
    }

    async ifExists () {
        var self = this;
        let accessToken = await LocalStorage.getFromLocalStorage(LocalStorage.FACEBOOK_KEY);
        if (accessToken == null) {
            Actions.Login({...self.props});
        } else {
            const responseInfoCallback = (error, result) => {
                if (error) {
                    alert(error.toString());
                } else {
                    axios.post('https://sitters-server.herokuapp.com/parent/get', { id: result.id })
                        .then(function (res) {
                            if (res.data) {  // user exists
                                self.props.actionCreators.setUserData(res.data);
                                Actions.Feed();
                            } else { // user not exist
                                self.props.actionCreators.createUser(result);
                                Actions.Login();
                                // Actions.Register();
                            }
                        })
                        .catch(function (error) {
                            alert(error.toString());
                        });
                }
            };

            const params = {
                parameters: {
                    fields: {
                        string: "id,name,email,cover,birthday,currency,education,gender,languages,location,timezone,picture.width(100).height(100)"
                    },
                    access_token: {
                        string: accessToken
                    }
                }
            };

            const infoRequest = new GraphRequest('/me', params, responseInfoCallback);
            new GraphRequestManager().addRequest(infoRequest).start();
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);