"use strict";

import React, { Component } from 'react';
import { ScrollView, Image, Text, View, ListView, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import geodist from "geodist";
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppBar from '../components/AppBar';
import Review from '../components/Review';
import * as sitterProfileActions from '../../src/actions/SitterProfileActions';
import * as FeedActions from '../../src/actions/FeedActions';
import * as RouterActions from '../actions/RouterActions';
import LoadingScreen from '../components/LoadingScreen';

class SitterProfileView extends React.Component {

    constructor (props) {
        super(props);
        this.navToInvite = this.navToInvite.bind(this);
    }
    
    componentWillMount() {
        let sitterID = this.props.sitterId;
        let self = this;
        self.props.feedActions.showSpinner(true);
        axios({
            method: 'post',
            url: 'https://sitters-server.herokuapp.com/sitter/get',
            // url: 'https://sittersdev.herokuapp.com/sitter/get',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: {_id: sitterID}
        }).then(function (sitter) {
            self.props.sitterProfileActions.setSitter(sitter.data);
            let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
            let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
            self.props.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'}));
            self.props.feedActions.showSpinner(false);
        }).catch(function (error) {
            Actions.ErrorPage({errorNum: 500, errorMsg: 'Server Error \nPlease try again later'});
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
                <Text style={styles.detailHeader}>Last Invited:</Text>
                <Text>{this.props.sitterProfile.sitter.lastInvite}</Text>
            </View> : null;
        const workingHours = Object.keys(this.props.sitterProfile.sitter.workingHours).map(function (key, index) {
            return (
                self.props.sitterProfile.sitter.workingHours[key].length > 0 ?
                <View key={index}>
                    <Text style={styles.dayKey}>{key[0].toUpperCase() + key.slice(1)}</Text>
                    <Text>{self.props.sitterProfile.sitter.workingHours[key].map(function(item) {
                        return item + " ";
                    })}</Text>
                </View> : null
            )
        });
        // TODO: add address and last invite
        return (
            <View style={styles.container}>
                    <AppBar
                        { ...this.props }/>
                    {
                        this.props.feed.showSpinner ?
                            <LoadingScreen /> :
                            <ScrollView>
                                <View style={styles.innerContainer}>
                                    <View>
                                        <Image source={{uri: coverPhoto}} style={styles.coverPhoto}>
                                            <View style={styles.sitterContainer}>
                                                <View style={styles.backgroundCircle}>
                                                    <Image
                                                        style={styles.profilePicture}
                                                        source={ this.props.sitterProfile.sitter.profilePicture ? { uri: this.props.sitterProfile.sitter.profilePicture } : null }
                                                    />
                                                </View>
                                                <Text style={styles.sitterText}>
                                                    { this.props.sitterProfile.sitter.name }, { this.props.sitterProfile.sitter.age }
                                                </Text>
                                            </View>
                                        </Image>
                                        <View style={styles.infoBar}>
                                            <Text style={styles.infoText}>
                                                { this.props.sitterProfile.distance > 999 ? 'Proximity\n' + this.props.sitterProfile.distance / 1000 + ' KM' : 'Proximity:\n' + this.props.sitterProfile.distance + ' Meters' }
                                            </Text>
                                            <Text style={styles.infoText}>
                                                { 'Hour Fee\n' + this.props.sitterProfile.sitter.hourFee + '$'}
                                            </Text>
                                            <Text style={styles.infoText}>
                                                { 'Experience\n' + this.props.sitterProfile.sitter.experience + " Years" }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.detailHeader}>Address</Text>
                                        <Text>{ sitterAddress }</Text>
                                        {lastInvite}
                                        <Text style={styles.detailHeader}>Availability</Text>
                                        { workingHours }
                                        {this.props.sitterProfile.sitter.hobbies ?
                                            <Text style={styles.detailHeader}>Hobbies</Text> : null}
                                        <View>
                                            {
                                                this.props.sitterProfile.sitter.hobbies ? this.props.sitterProfile.sitter.hobbies.map(function (hobbie) {
                                                    return <Text key={ hobbie }>{ hobbie + ' ' }</Text>;
                                                }) : null
                                            }
                                        </View>
                                        {this.props.sitterProfile.sitter.education ?
                                            <Text style={styles.detailHeader}>Education</Text> : null}
                                        <View>
                                            {
                                                this.props.sitterProfile.sitter.education ? this.props.sitterProfile.sitter.education.map(function (education) {
                                                    return <Text key={ education }>{ education + ' ' }</Text>;
                                                }) : null
                                            }
                                        </View>
                                        {this.props.sitterProfile.sitter.languages ?
                                            <Text style={styles.detailHeader}>Languages</Text> : null}
                                        <View>
                                            {
                                                this.props.sitterProfile.sitter.languages ? this.props.sitterProfile.sitter.languages.map(function (lang) {
                                                    return <Text key={ lang }>{ lang + ' ' }</Text>;
                                                }) : null
                                            }
                                        </View>
                                        {this.props.sitterProfile.sitter.expertise ?
                                            <Text style={styles.detailHeader}>Expertise</Text> : null}
                                        <View>
                                            {
                                                this.props.sitterProfile.sitter.expertise ? this.props.sitterProfile.sitter.expertise.map(function (expertise) {
                                                    return <Text key={ expertise }>{ expertise + ' '}</Text>;
                                                }) : null
                                            }
                                        </View>
                                        <Text
                                            style={styles.detailHeader}>Reviews({ this.props.sitterProfile.sitter.reviews.length })</Text>
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
                    }
                {
                    this.props.feed.showSpinner ? null :
                        <View style={styles.actionBar}>
                            <Icon.Button name="remove" size={48} backgroundColor="#fff" color="#8c8c8c" onPress={Actions.pop} />
                            <Icon.Button name="envelope" size={48} backgroundColor="#fff" color="#8c8c8c" onPress={(e) => this.navToInvite(e, id)} />
                        </View>
                }
            </View>
        );
    }

    navToInvite(e, sitterId) {
        Actions.SitterSendInvite({ sitterId: sitterId });
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    innerContainer: {
        flex:1
    },
    sitterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    profilePicture: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius:100,
    },
    backgroundCircle: {
        width: 110,
        height: 110,
        borderRadius:100,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    sitterText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textShadowColor: '#000',
        textShadowOffset: {width: 2, height: 2}
    },
    dayKey: {
        color: '#f7a1a1',
        marginBottom: 2,
        marginTop: 2
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
    infoBar: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#f7a1a1'
    },
    infoText: {
        fontSize: 20,
        color: '#fff'
    },
    detailContainer: {
        margin: 15
    },
    detailHeader: {
        fontSize: 16,
        color: '#f7a1a1',
        paddingBottom: 5,
        paddingTop: 5
    },
    actionBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    textButton: {
        fontSize: 20,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        marginRight: 15
    },
    imageButton: {
        width: 50,
        height: 50,
        borderRadius:100
    }
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
        routerActions: bindActionCreators(RouterActions, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterProfileView);