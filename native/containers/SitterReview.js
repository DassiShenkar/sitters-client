"use strict"
import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Image, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Review from '../components/Review';
import TextButton from '../components/TextButton';
import ImageButton from '../components/ImageButton';

import * as sitterProfileActions from '../../src/actions/SitterProfileActions';

class SitterReview extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={true}
                onRequestClose={() => {Actions.pop()}}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        {this.props.sitterProfile.sitter.reviews.length > 0 ?
                        <View>
                            <Text style={styles.detailHeader}>Reviews({ this.props.sitterProfile.sitter.reviews.length })</Text>
                            <ListView
                                enableEmptySections={true}
                                dataSource={ ds.cloneWithRows(this.props.sitterProfile.sitter.reviews) }
                                renderRow={(data) => <Review {...data} />}
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                            />
                        </View>
                        : <Text style={styles.detailHeader}>No reviews yet</Text>}
                        <View style={styles.actionBar}>
                            <TextButton
                                onPress={Actions.pop}
                                styles={styles.textButton}
                                text='Cancel' />
                            <ImageButton
                                onPress={ (e) =>  this.navToInvite(e, id) }
                                styles={styles.imageButton}
                                src={require('../style/icons/inbox.png')} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
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
        margin: 5,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitterReview);

