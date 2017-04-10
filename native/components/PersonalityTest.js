"use strict";
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Rating from 'react-native-easy-rating';

const questions = [
    "I consider myself as an investor in his own field",
    "I consider myself a responsible person",
    "I consider myself as having a sensitivity to the needs of others",
    "I used to invest mainly in the things I'm good, and to give up when I'm having difficulty",
    "I consider myself as a creative person who can provide children with an interest",
    "It is important for me to know everything you expect me to clearly and completely",
    "I consider myself punctual times",
    "I believe I can fulfill the expectations of parents",
    "It is important to me that parents will be satisfied with my work",
    "I expect myself to demonstrate assertiveness in cases where children have demonstrated a lack of discipline",
    "Especially problematic situations of stress I can't handle",
    "I think that all people in the world are honest",
    "At least once in life I took an object that belongs to someone without permission",
    "In the case of an extreme lack of knowledge of how to correctly operate, I will be relying on my intuition and not call to ask the parents.",
    "The boy cursed his brother and will be punished if parents know, so you'd rather not tell his parents of child care"
];

var PersonalityTest = React.createClass({
    render: function () {
        return (
            <View>
                {this.question()}
            </View>
        );
    },
    question: function (){
        return questions.map(function (question) {
           return <View>
                    <Text>{question}</Text>
                    <Rating
                       rating={1}
                       max={5}
                       iconWidth={24}
                       iconHeight={24}
                       iconSelected={require('../style/icons/full.png')}
                       iconUnselected={require('../style/icons/empty.png')}
                       onRate={(rating) => {alert(rating);}} />
               </View>;
        })
    }
});

export default PersonalityTest
