"use strict";

import React, { Component } from 'react';
import { ScrollView, Image, Text, View, ListView, StyleSheet } from 'react-native'
import AppBar from '../components/AppBar'
import Review from '../components/Review'

export default class SitterProfileView extends React.Component {

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{
                id: 0,
                name: 'Michael',
                date: '12/04/17',
                stars: 5,
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                review: 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing.'
            }, {
                id: 1,
                name: 'Michael',
                date: '12/04/17',
                stars: 5,
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                review: 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing.'
            }, {
                id: 2,
                name: 'Michael',
                date: '12/04/17',
                stars: 5,
                image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                review: 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing.'
            }])
        };
        this.renderRow = this.renderRow.bind(this);
    }

    render () {
        const proximity = '500m\nProximity';
        const hourFee = '12$\nHour Fee';
        const experience = '2 Years\nExperience';
        return (
            <ScrollView>
                <AppBar />
                <Image />
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
        backgroundColor: '#8E8E8E',
    },
});