"use strict";

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tabs from 'react-native-tabs';

import LocationSearch from '../components/LocationSearch';
import TimeSearch from '../components/TimeSearch';
import PriceSearch from '../components/PriceSearch';
import AppBar from '../components/AppBar';

export default class Search extends React.Component {

    constructor (props) {
        super(props);
        this.getContent = this.getContent.bind(this);
        this.state = {page:'Location',content: this.getContent};
    }

    render () {
        var self = this;
        return (
            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                      selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}>
                    <Text name="Location">Location</Text>
                    <Text name="Time">Time</Text>
                    <Text name="Price">Price</Text>
                </Tabs>
                { this.getContent() }
            </View>
        );
    }

    getContent () {
        switch(this.state.page){
            case 'Location':
                return <View>
                        <AppBar />
                        <LocationSearch />
                    </View>;
            case 'Time':
                return <View>
                    <AppBar />
                    <TimeSearch />
                </View>;
            case 'Price':
                return <View>
                    <AppBar />
                    <PriceSearch />
                </View>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    }
});