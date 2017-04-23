"use strict";

import React, { Component } from 'react';
import { ScrollView, Image, Text, View, ListView, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from '../components/AppBar';
import Review from '../components/Review';
import * as sitterProfileActions from '../../src/actions/SitterProfileActions';

class SitterProfileView extends React.Component {

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['No reviews yet'])
        };
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        let sitterID = this.props.sitterId;
        let self = this;
        axios.post('https://sitters-server.herokuapp.com/sitter/get', {
            _id: sitterID
        })
            .then(function (sitter) {
                self.props.sitterProfileActions.setSitter(sitter.data);
                let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
                let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
                self.props.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'}));
                var newState = {
                    dataSource: ds.cloneWithRows(this.props.sitterProfile.sitter.reviews)
                };
                this.setState(newState);
            })
            .catch(function (error) {
                // alert(JSON.stringify(error));//TODO: in case of sitter wasn't found
            });
    }

    render () {
        const proximity = '500m\nProximity';
        const hourFee = '12$\nHour Fee';
        const experience = '2 Years\nExperience';
        return (
            <ScrollView>
                <AppBar
                    { ...this.props }/>
                <Image
                    styles={{width: 200, height: 200, justifyContent: 'center', borderRadius:100}}
                    source={this.props.sitterProfile.sitter.profilePicture ? { uri: this.props.sitterProfile.sitter.profilePicture } : { uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <Text>Name, Age</Text>
                <Text>100% Match!</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>{ proximity }</Text>
                    <Text>{ hourFee }</Text>
                    <Text>{ experience }</Text>
                </View>
                <Text>Availability</Text>
                <Text>Sunday - Saturday</Text>
                <Text>17:00 - 24:00</Text>
                <Text>Hobbies</Text>
                <Text>Horse Riding, Reading, Traveling</Text>
                <Text>Education</Text>
                <Text>Rabin High School, Kfar saba</Text>
                <Text>Languages</Text>
                <Text>Hebrew, English</Text>
                <Text>Reviews(Num of Reviews)</Text>
                <View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) => <Review {...data} />}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                </View>
            </ScrollView>
        );
    }

    renderRow (rowData) {
        return (
            <Review
                name={ rowData.name }
                date={ rowData.date }
                stars={ rowData.stars }
                image={ rowData.image }
                review={ rowData.review } />
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
});

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sitterProfileActions: bindActionCreators(sitterProfileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterProfileView);