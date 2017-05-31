"use strict";

import React, { Component } from 'react';
import { View, Modal, Text, Image, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Rating from 'react-native-easy-rating';

import TextButton from '../components/TextButton'
import * as SitterProfileActions from '../../src/actions/SitterProfileActions';
import * as ReviewActions from '../../src/actions/ReviewActions';
import * as actionCreators from '../../src/actions/actionCreators';
import * as FeedActions from '../../src/actions/FeedActions';

const rateItems = ['Punctual', 'Behavior with child', 'Connection with child', 'General behavior'];

class RateSitter extends React.Component {

    constructor (props) {
        super(props);
        this.addReview = this.addReview.bind(this);
        this.ratings = this.ratings.bind(this);
        this.reviewDescription = this.reviewDescription.bind(this);
        this.onChangeRate = this.onChangeRate.bind(this);
    }

    addReview() {
        const self = this;
        let sitter = this.props.sitter;
        let review = {
            _id: uuid.v1(),
            sitterID: sitter._id,
            parentID: this.props.user._id,
            parentImage: this.props.user.profilePicture,
            parentName: this.props.user.name,
            description: this.props.feed.review.text,
            rates: this.props.feed.review.rates
        };
        sitter.reviews.push(review);
        axios({
            method: 'post',
            url: 'https://sitters-server.herokuapp.com/sitter/update',
            // url: 'https://sittersdev.herokuapp.com/sitter/update',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
        }).then(function (res) {
            if (res.data) {
                console.log('Added review');
                Actions.pop();
            }
            else {
                console.log("review not created");
                Actions.pop();
            }
        }).catch(function (error) {
            console.log(error);
            alert("review not sent");
            Actions.pop();
        });
    }

    render () {
        const profilePicture = this.props.sitter ? this.props.sitter.profilePicture : null;
        const userName = this.props.user.name;
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={true}
                onRequestClose={() => {Actions.pop()}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <Image
                            style={styles.image}
                            source={{uri: profilePicture}}
                        />
                        { this.ratings() }
                        <Text style={styles.text}>Notes</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.reviewDescription(userName, text)}
                            placeholder='Write a review' />
                        <View style={styles.actionPanel}>
                            <TextButton
                                onPress={Actions.pop}
                                styles={styles.actionButton}
                                text='Cancel' />
                            <TextButton
                                onPress={this.addReview}
                                styles={styles.actionButton}
                                text='Send' />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    reviewDescription(userName, text) {
        this.props.reviewActions.addReview(userName, text);
        this.props.sitterProfileActions.setReviewDescription(text);
    }

    ratings() {
        const self = this;
        return rateItems.map(function(item) {
            return (
                <View key={ item+'1' } style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text key={ item+'2' } style={{ color: '#f7a1a1', fontSize: 12, fontWeight: 'bold' }}>{ item }</Text>
                    <Rating
                        key={ item }
                        rating={1}
                        max={5}
                        iconWidth={24}
                        iconHeight={24}
                        iconSelected={require('../style/icons/full.png')}
                        iconUnselected={require('../style/icons/empty.png')}
                        onRate={(rating) => {self.onChangeRate(item,rating)}} />
                </View>
            );
        })
    }

    onChangeRate(category,rate){
        this.props.feedActions.changeReviewRate(category,rate)
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '60%',
        margin: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    text: {
        width: '100%',
        justifyContent: 'flex-start',
        color: '#f7a1a1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textInput: {
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: 15
    },
    actionPanel: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    actionButton:{
        fontSize: 20,
        backgroundColor: '#f7a1a1',
        color: '#fff',
        padding: 5,
        borderRadius: 10
    }
});

function mapStateToProps(state) {
    return {
        sitterProfile: state.sitterProfile,
        user: state.user,
        feed: state.feed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch),
        sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
        reviewActions: bindActionCreators(ReviewActions, dispatch),
        feedActions: bindActionCreators(FeedActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RateSitter);
