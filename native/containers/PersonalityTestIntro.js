"use strict";
import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

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
    }

    render () {
        return (
            <ScrollView>
                <Text>Test Instructions</Text>
                <Text>{ greeting }</Text>
                <CheckBox
                    style={{flex: 1, padding: 10}}
                    onClick={()=>{ alert('Agree') } }
                    isChecked={false}
                    leftText={boxText}
                />
                <ImageButton
                    onPress={Actions.PersonalityTest}
                    styles={{width: 50, height: 50}}
                    src={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
            </ScrollView>

        );
    }
}
