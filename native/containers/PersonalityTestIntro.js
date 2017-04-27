"use strict";
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Checkbox } from 'react-native-material-design';

import ImageButton from '../components/ImageButton';

const greeting = 'The following questionnaire includes statements that describe how you feel and acts during activities, '+
                'you will have to mark the level of agreement on a scale from 1 (strongly disagree) to 5 (strongly agree). '+
                'It is important to answer the questionnaire of seriousness and sincere manner. '+
                'It is important though that you know that this questionnaire can be answered only once and the results of '+
                'the questionnaire are not published to the parents, and not delivered to anyone else. '+
                'It is important though that you know that this questionnaire can be answered only once and '+
                'the results of the questionnaire are not published to the parents, and not delivered to anyone else.';

const boxText = 'I Agree';

export default class PersonalityTestIntro extends React.Component {

    constructor (props) {
        super(props);
        this.checkChecked = this.checkChecked.bind(this);
        this.navToPersonalityTest = this.navToPersonalityTest.bind(this);
        this.state = {
            checked: false
        }
    }

    render () {
        return (
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <Text>Test Instructions</Text>
                    <Text>{ greeting }</Text>
                    <Checkbox
                        label={ boxText }
                        value={ boxText }
                        onCheck={ this.checkChecked }
                        checked={this.state.checked}
                    />
                    <ImageButton
                        onPress={this.navToPersonalityTest}
                        styles={{width: 50, height: 50,borderRadius:100}}
                        src={require('../style/icons/next.png')} />
                </View>
            </ScrollView>
        );
    }

    checkChecked() {
        var newState = {
            checked: !this.state.checked
        };
        this.setState(newState);
    }

    navToPersonalityTest() {
        if(this.state.checked === true) {
            Actions.PersonalityTest({questionNum: 1, callback: this.props.callback})
        } else {
            alert('Please Check "I Agree"');
        }
    }
}
