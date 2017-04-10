"use strict";
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Form from 'react-native-form'

var ParentForm = React.createClass({
    render: function () {
        return (
            <Form>
                <TextInput type="TextInput" name="name" />
                <TextInput type="TextInput" name="email" placeholder="Enter your email" />
                <TextInput type="TextInput" name="age" placeholder="Enter your email" />
                <Text>Address</Text>
                <TextInput type="TextInput" name="city" placeholder="Enter your email" />
                <TextInput type="TextInput" name="street" placeholder="Enter your email" />
                <TextInput type="TextInput" name="houseNumber" placeholder="Enter your email" />
                <Text>Gender</Text>
            </Form>
        );

    }
});

export default ParentForm;


// <TextInput ref='age' label="Age" type="number" placeholder="25"/>
// <h4>Address</h4>
// <TextInput ref='city' label="City" placeholder="Tel Aviv"/>
//     <TextInput ref='street' label="Street" placeholder="Arlozorov"/>
//     <TextInput ref='houseNumber' label="House Number" type="number" placeholder="4"/>
//     <h3>Gender</h3>
//     {/*<RadioInput ref="genderRadio" types={['Male', 'Female']} default={this.state.gender}/>*/}
// <RadioInput ref="userInput" types={strings.GENDER}
//             action={this.props.actions.actionCreators.changeUserType}
//             radioType={'userType'} {...this.props}
//             reducer={'user'}/>
// <h4>Profile picture</h4>
// {/*<img src={this.state.profilePicture} alt={this.state.name}/>*/}
// <h4>Languages</h4>
// {/*<Select*/}
// {/*name="form-field-name"*/}
// {/*multi={true}*/}
// {/*value={this.state.languages}*/}
// {/*options={this.state.options}*/}
// {/*onChange={this.handleLanguageSelect.bind(this)}*/}
// {/*placeholder="Select your favourite(s)"*/}
// {/*/>*/}
// <h3>Child</h3>
// <TextInput ref='maxPrice' label="Max price for watch" type="number" placeholder="20"/>
//     <TextInput ref='childName' label="Child Name" placeholder="Yoel"/>
//     <TextInput ref='childAge' label="Age" type="number" placeholder="2"/>
//     <h4>Child Expertise</h4>
// <CheckBoxInput name="childExpertise" types={['Math', 'English', 'Physics']} ref="childExpertise"/>
//     <h4>Child Hobbies</h4>
// <CheckBoxInput name="childHobbies"
// types={['Reading', 'Painting', 'Traveling', 'Sports', 'Swimming', 'Sleeping', 'Watching TV']}
// ref="childHobbies"/>
//     <h4>Child Special needs</h4>
// <CheckBoxInput name="childSpecialNeed"
// types={['ADD', 'Aphasia/Dysphagia', 'Auditory Processing', 'Autism', 'Cystic Fibrosis', 'Developmental Delays']}
// ref="childSpecialNeed"/>
//     <input type="submit" className="submit-invite" value="Sign Up"/>