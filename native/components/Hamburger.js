"use strict";
import React, { Component } from 'react';
import { View } from 'react-native';
import Hamburger from 'react-native-hamburger';


export default class MyHamburger extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <View>
                <Hamburger
                    active={false}
                    type='spinCross'
                    onPress={()=>{}}
                >

                </Hamburger>
            </View>
        );
    }
}
