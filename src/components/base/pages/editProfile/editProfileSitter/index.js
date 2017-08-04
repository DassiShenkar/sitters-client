//external sources
import React from 'react';

//utils
import {post} from '../../../../../utils/serverCalls';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

//statics
import strings from "../../../../../static/strings";

export default class EditProfileSitterBase extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.convertStringArrayToMultiSelect = this.convertStringArrayToMultiSelect.bind(this);
    }

    convertStringArrayToMultiSelect(array, stateArray){
        if(array.length === 0 && stateArray.length === 0){
            return array;
        }
        else if(stateArray.length > 0)
            return stateArray;
        else {
            let arr =  [];
            array.forEach(function(element){
                arr.push({value:element.toLowerCase(), label:element});
            });
            return arr;
        }
    }

    handleSubmitSitter(e) {// get all the form params and create sitter
        e.preventDefault();
        const self = this;
        let sitter = this.props.user;
        let expertise = [], hobbies = [], specialNeeds = [], education = [], languages = [];
        if (this.props.editProfile.languages.length > 0) {
            this.props.editProfile.languages.forEach(function (o) {
                languages.push(o.value);
            })
        }
        if (this.props.editProfile.sitterExpertise.length > 0) {
            this.props.editProfile.sitterExpertise.forEach(function (o) {
                expertise.push(o.value);
            })
        }
        if (this.props.editProfile.sitterSpecialNeeds.length > 0) {
            this.props.editProfile.sitterSpecialNeeds.forEach(function (o) {
                specialNeeds.push(o.value);
            })
        }
        if (this.props.editProfile.sitterHobbies.length > 0) {
            this.props.editProfile.sitterHobbies.forEach(function (o) {
                hobbies.push(o.value);
            })
        }
        if (this.props.editProfile.sitterEducation.length > 0) {
            this.props.editProfile.sitterEducation.forEach(function (o) {
                education.push(o.value);
            });
        }
        sitter.name = this.props.editProfile.name !== "" ? this.props.editProfile.name : this.props.user.name;
        sitter.email = this.props.editProfile.email !== "" ? this.props.editProfile.email : this.props.user.email;
        sitter.age = this.props.editProfile.age !== "" ? this.props.editProfile.age : this.props.user.age;
        sitter.motto = this.props.editProfile.sitterMotto !== "" ? this.props.editProfile.sitterMotto : this.props.user.motto;
        sitter.expertise = expertise;
        sitter.hobbies = hobbies;
        sitter.specialNeeds = specialNeeds;
        sitter.languages = languages;
        sitter.education = education;
        sitter.hourFee = this.props.editProfile.hourFee !== "" ? this.props.editProfile.hourFee : this.props.user.hourFee;
        sitter.experience = this.props.editProfile.sitterExperience !== "" ? this.props.editProfile.sitterExperience : this.props.user.experience;
        sitter.minAge = this.props.editProfile.sitterMinAge !== "" ? this.props.editProfile.sitterMinAge : this.props.user.minAge;
        sitter.maxAge = this.props.editProfile.sitterMaxAge !== "" ? this.props.editProfile.sitterMaxAge : this.props.user.maxAge;

        post(sittersApi.UPDATE_SITTER, sitter, function(result){
            if (result.data)   // user updated
                self.props.router.push('/');
        });
    }
    handleSelect(selectedKey) {
        this.props.actions.registerActions.changeRegisterView(selectedKey);
    }

    next(){
        let registerViewIndex = strings.STEPS.indexOf(this.props.register.view) +1;
        this.props.actions.registerActions.changeRegisterView(strings.STEPS[registerViewIndex])
    }
}