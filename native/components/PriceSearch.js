"use strict";

import React, { Component } from 'react';
import { View, Text, Image, Slider } from 'react-native';
import { Actions } from 'react-native-router-flux'

import ImageButton from '../components/ImageButton'

export default class PriceSearch extends React.Component {

    constructor (props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.navToProfile = this.navToProfile.bind(this);
        this.navToInvite = this.navToInvite.bind(this);
        this.removeSitter = this.removeSitter.bind(this);
    }

    render () {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitterId = this.props.sitters.length ? this.props.sitters[sitterIndex]._id : 0;
        const profilePicture = this.props.sitters.length ? this.props.sitters[sitterIndex].profilePicture : null;
        const name = this.props.sitters.length ? this.props.sitters[sitterIndex].name : null;
        const age = this.props.sitters.length ? this.props.sitters[sitterIndex].age : null;
        const availableNow = this.props.sitters.length ? this.props.sitters[sitterIndex].availableNow : null;
        const hourFee = this.props.sitters.length ? this.props.sitters[sitterIndex].hourFee : null;
        let value = typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : this.props.searchBy.priceMaxRange;
        return (
            <View style={{ margin: 15, alignItems: 'center', width: '100%' }}>
                <View style={{ justifyContent: 'flex-start', marginBottom: 100 }}>
                    <Text style={{ fontSize: 16, color: '#f7a1a1', paddingBottom: 10, paddingTop: 10}}>
                        Max Hour rate: {typeof this.props.searchBy.priceMaxRange === "undefined" ? 50 : Math.floor(this.props.searchBy.priceMaxRange)}$
                    </Text>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '80%' }}>
                        <Text style={{ fontSize: 12, color: '#f7a1a1', paddingTop: 10}}>1</Text>
                        <Text style={{ fontSize: 12, color: '#f7a1a1', paddingTop: 10}}>50</Text>
                    </View>
                    <Slider
                        value={ value }
                        style={{ width: '80%' }}
                        {...this.props}
                        maximumTrackTintColor="#f7a1a1"
                        thumbTintColor="#f7a1a1"
                        maximumValue={50}
                        minimummValue={1}
                        onSlidingComplete={(value) => this.filter(value)} />
                </View>
                { this.props.sitters.length > 0 ?
                    <View>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '70%', marginBottom: 100}}>
                            <ImageButton
                                onPress={ (e) => {this.navToProfile(e, sitterId)} }
                                styles={{width: 100, height: 100, borderRadius:100}}
                                src={this.props.sitters.length > 0 ? { uri: profilePicture } : {} } />
                            <View style={{ paddingTop: 10 }}>
                                <Text>{name + ', ' + age}</Text>
                                { availableNow ? <Text>Available now!</Text> : null}
                                <Text>{ hourFee + '$' }</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '50%'}}>
                            <ImageButton
                                onPress={ (e) => this.navToInvite }
                                styles={{ width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/v.png')}/>
                            <ImageButton
                                onPress={ (e) => this.removeSitter }
                                styles={{width: 50, height: 50, borderRadius:100}}
                                src={require('../style/icons/next.png')}/>
                        </View>
                    </View>
                    : <Text>No matches found!</Text>
                }
            </View>
        );
    }

    navToProfile(e, sitterId) {
        Actions.SitterProfileView({ sitterId: sitterId });
    }

    navToInvite() {
        let sitterIndex = this.props.feed.sitterIndex;
        let sitter = this.props.sitters[sitterIndex];
        Actions.SitterSendInvite({ sitter: sitter });
    }

    removeSitter() {
        let index = this.props.feed.sitterIndex === (this.props.feed.filteredMatches.length - 1) ? 0 : this.props.feed.sitterIndex + 1;
        this.props.feedActions.setSitterIndex(index);
        Actions.Search({index: this.props.pageIndex});
    }

    filter(value) {
        let sitters = this.props.feed.matches;
        this.props.rangeActions.changeRange(1, Math.floor(value));
        this.props.feedActions.setFilteredMatches(sitters.filter(sitter => sitter.hourFee >= 1 && sitter.hourFee <= Math.floor(value)));
        Actions.Search({index: this.props.pageIndex});
    }
}