"use strict";
import React, {Component} from 'react'
import {View, ScrollView, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {  connect } from 'react-redux';
import Rating from 'react-native-easy-rating';

import * as RegisterActions from '../../src/actions/RegisterActions';
import strings from '../../src/static/strings';
import ImageButton from '../components/ImageButton'

class PersonalityTest extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.questions = this.questions.bind(this);
    }

    render() {
        let questions = this.questions();
        return (
            <ScrollView>
                {questions[this.props.questionNum]}
                <ImageButton
                    onPress={this.navigate}
                    styles={{width: 50, height: 50,borderRadius:100}}
                    src={require('../style/icons/next.png')} />
            </ScrollView>
        );
    }

    questions() {
        const self = this;
        return strings.QUESTIONS.map(function (question) {
            return <View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <Text>{question.label1}</Text>
                    <Text>{question.label2}</Text>
                </View>
                <Rating
                    rating={1}
                    max={5}
                    iconWidth={24}
                    iconHeight={24}
                    iconSelected={require('../style/icons/full.png')}
                    iconUnselected={require('../style/icons/empty.png')}
                    onRate={(rating) => {
                        question.value = rating;
                        self.props.registerActions.changePersonalityTestQuestion(question);
                     }} />
            </View>;
        })
    }

    navigate() {
        let index = this.props.questionNum;
        if(index >= 9) {
            this.props.callback();
        } else {
            Actions.refresh({questionNum: index + 1, callback: this.props.callback});
        }
    }
}

function mapStateToProps(state) {
    return {
        register: state.register
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(RegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityTest);

