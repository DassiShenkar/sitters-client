"use strict";
import React, {Component} from 'react'
import {View, ScrollView, Text, Slider, StyleSheet} from 'react-native'
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
        this.questions = this.questions.bind(this);
    }

    render() {
        let questions = this.questions();
        return (
            <ScrollView>
                <Text style={styles.text}>Tell us about yourself</Text>
                {questions}
                <ImageButton
                    onPress={this.props.callback}
                    styles={styles.button}
                    src={require('../style/icons/next.png')} />
            </ScrollView>
        );
    }

    questions() {
        const self = this;
        var index = 0;
        return strings.QUESTIONS.map(function (question) {
            return <View>
                <View style={styles.questionContainer}>
                    <Text>{question.label1}</Text>
                    <Slider
                        value={ question.value ? question.value : 2 }
                        style={styles.slider}
                        dots={true}
                        maximumTrackTintColor="#f7a1a1"
                        thumbTintColor="#f7a1a1"
                        maximumValue={4}
                        minimummValue={0}
                        onSlidingComplete={(value) => {
                            question.index = index;
                            index++;
                            question.value = value;
                            self.props.registerActions.changePersonalityTestQuestion(question);
                        }} />
                    <Text>{question.label2}</Text>
                </View>
            </View>;
        })
    }
}

const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        margin: 10
    },
    slider: {
        width: '50%'
    },
    text: {
        color: '#f7a1a1',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        width: 50,
        height: 50,
        borderRadius:100
    }
});

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

