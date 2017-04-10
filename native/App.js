"use strict";
import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import Login from './components/Login'
import RadioButtons from './components/RadioButton'
import Logo from './components/Logo'

var App = React.createClass({
  render: function () {
    return (
      <View>
        <Logo
            companyName="Sitters"
        />
         <Text>A Booking Platform for Parents and Sitters</Text>
        <RadioButtons
            values={[
              {label: 'I\'m A Parent', value: 0 },
              {label: 'I\'m A Sitter', value: 1 }
            ]}
        />
        <Login
            navigation={this.props.navigation}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        
    }
});

export default App;