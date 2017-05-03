"use strict";

import React, { Component, PropTypes  } from 'react';
import { ScrollView, Image, Text, View, ListView, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import geodist from "geodist";
import { Actions } from 'react-native-router-flux';

import AppBar from '../components/AppBar';
import Review from '../components/Review';
import * as sitterProfileActions from '../../src/actions/SitterProfileActions';
import * as RouterActions from '../actions/RouterActions';
import ImageButton from '../components/ImageButton';
import TextButton from '../components/TextButton';

class SitterProfileView extends React.Component {

    constructor (props) {
        super(props);
        this.navToInvite = this.navToInvite.bind(this);
    }
    
    componentWillMount() {
        let sitterID = this.props.sitterId;
        let self = this;
        axios({
            method: 'post',
            // url: 'https://sitters-server.herokuapp.com/sitter/get',
            url: 'https://sittersdev.herokuapp.com/sitter/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: sitterID}
        }).then(function (sitter) {
            self.props.sitterProfileActions.setSitter(sitter.data);
            let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
            let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
            self.props.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'}));
            console.log(sitter);
        }).catch(function (error) {
            console.log(error);//TODO: in case of sitter wasn't found
        });
    }

    componentDidUpdate () {
        var self = this;
        console.log(self.props.router.validFlag);
        if(self.props.router.validFlag) {
            this.props.routerActions.changeValidFlag(false);
            Actions.Feed();
        }
    }

    render () {
        const id = this.props.sitterId;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const coverPhoto = this.props.sitterProfile.sitter.coverPhoto ? this.props.sitterProfile.sitter.coverPhoto : null;
        const self = this;
        const sitterAddress = this.props.sitterProfile.sitter.address.street + " " +  this.props.sitterProfile.sitter.address.houseNumber + ", " + this.props.sitterProfile.sitter.address.city;
        const lastInvite = this.props.sitterProfile.lastInvite?
            <View>
                <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Last Invited:</Text>
                <Text>{this.props.sitterProfile.sitter.lastInvite}</Text>
            </View> : null;
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function (key, index) {
            return (
                <View key={index}>
                    <Text>{key[0].toUpperCase() + key.slice(1)}</Text>
                    <Text>{self.props.sitterProfile.sitter.workingHours[key].start + '-' + self.props.sitterProfile.sitter.workingHours[key].finish}</Text>
                </View>
            )
        });
        // TODO: add address and last invite
        return (
            <View style={{ flex:1 }}>
                <ScrollView>
                    <AppBar
                        { ...this.props }/>
                    <View style={{ flex:1 }} >
                        <View>
                            <Image source={{ uri: coverPhoto }} style={{width: null, height: null, resizeMode:'stretch'}}>
                                <Image
                                    style={{width: 150, height: 150, justifyContent: 'center', borderRadius:100, marginLeft: 110, marginTop: 70}}
                                    source={ this.props.sitterProfile.sitter.profilePicture ? { uri: this.props.sitterProfile.sitter.profilePicture } : null }
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 50, marginRight: 90 }}>
                                    { this.props.sitterProfile.sitter.name }, { this.props.sitterProfile.sitter.age }
                                </Text>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 20, marginRight: 120 }}>
                                    {this.props.sitterProfile.sitter ? this.props.feed.matches.find(function (sitter) {
                                        return sitter._id === id;
                                    }).matchScore + '% Match!' : 'no matches found'}
                                </Text>
                            </Image>
                            <View style={{flex: 1, flexDirection: 'row-reverse', padding: 10, justifyContent: 'space-between', width: '100%', backgroundColor: '#f7a1a1'}}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>
                                    { this.props.sitterProfile.distance > 999 ? this.props.sitterProfile.distance / 1000 + ' KM' : +this.props.sitterProfile.distance + " Meters" }
                                </Text>
                                <Text style={{ fontSize: 20, color: '#fff' }}>
                                    { this.props.sitterProfile.sitter.hourFee + "$" }
                                </Text>
                                <Text style={{ fontSize: 20, color: '#fff' }}>
                                    { this.props.sitterProfile.sitter.experience + " Years" }
                                </Text>
                            </View>
                        </View>
                        <View style={{ margin: 15 }}>
                            <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Address</Text>
                            <Text>{ sitterAddress }</Text>
                            {lastInvite}
                            <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Availability</Text>
                            { workingHours }
                            {this.props.sitterProfile.sitter.hobbies ? <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Hobbies</Text> : null}
                            <View style={{ flexDirection: "row-reverse" }}>
                                {
                                    this.props.sitterProfile.sitter.hobbies ? this.props.sitterProfile.sitter.hobbies.map(function(hobbie) {
                                        return <Text key={ hobbie }>{ hobbie + ' ' }</Text>;
                                    }) : null
                                }
                            </View>
                            {this.props.sitterProfile.sitter.education ? <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Education</Text> : null}
                            <View style={{ flexDirection: "row-reverse" }}>
                                {
                                    this.props.sitterProfile.sitter.education ? this.props.sitterProfile.sitter.education.map(function(education) {
                                        return <Text key={ education }>{ education + ' ' }</Text>;
                                    }) : null
                                }
                            </View>
                            {this.props.sitterProfile.sitter.languages ? <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Languages</Text> : null}
                            <View style={{ flexDirection: "row-reverse" }}>
                                {
                                    this.props.sitterProfile.sitter.languages ? this.props.sitterProfile.sitter.languages.map(function(lang) {
                                        return <Text key={ lang }>{ lang + ' ' }</Text>;
                                    }) : null
                                }
                            </View>
                            {this.props.sitterProfile.sitter.expertise ? <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Expertise</Text> : null}
                            <View style={{ flexDirection: "row-reverse" }}>
                                {
                                    this.props.sitterProfile.sitter.expertise ? this.props.sitterProfile.sitter.expertise.map(function(expertise) {
                                        return <Text key={ expertise }>{ expertise + ' '}</Text>;
                                    }) : null
                                }
                            </View>
                            <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 5, paddingTop: 5}}>Reviews({ this.props.sitterProfile.sitter.reviews.length })</Text>
                            <View>
                                <ListView
                                    enableEmptySections={true}
                                    dataSource={ ds.cloneWithRows(this.props.sitterProfile.sitter.reviews) }
                                    renderRow={(data) => <Review {...data} />}
                                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 5 }}>
                    <TextButton
                        onPress={Actions.pop}
                        styles={{ fontSize: 20, backgroundColor: '#f7a1a1', color: '#fff', padding: 5, borderRadius: 10, margin: 5, marginRight: 15 }}
                        text='Cancel' />
                    <ImageButton
                        onPress={ (e) =>  this.navToInvite(e, id) }
                        styles={{width: 50, height: 50, borderRadius:100}}
                        src={require('../style/icons/inbox.png')} />
                </View>
            </View>
        );
    }

    navToInvite(e, sitterId) {
        Actions.SitterSendInvite({ sitterId: sitterId });
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
        user: state.user,
        sitterProfile: state.sitterProfile,
        feed: state.feed,
        router: state.router
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sitterProfileActions: bindActionCreators(sitterProfileActions, dispatch),
        routerActions: bindActionCreators(RouterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterProfileView);