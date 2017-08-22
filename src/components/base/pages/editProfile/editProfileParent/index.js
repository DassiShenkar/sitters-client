//external sources
import React from 'react';

//utils
import {request} from '../../../../../utils/requestHandler';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

//statics
import strings from "../../../../../static/strings";

export default class EditProfileParentBase extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        this.convertStringArrayToMultiSelect = this.convertStringArrayToMultiSelect.bind(this);
    };

    handleSubmitParent(e) {
        e.preventDefault();
        const self = this;
        let parent = this.props.user;
        let expertise = [], hobbies = [], specialNeeds = [], languages = [];
        if(this.props.editProfile.languages.length > 0){
            this.props.editProfile.languages.forEach(function(o){
                languages.push(o.value);
            })
        }
        if(this.props.editProfile.childExpertise.length > 0){
            this.props.editProfile.childExpertise.forEach(function(o){
                expertise.push(o.value);
            })
        }
        if(this.props.editProfile.childSpecialNeeds.length > 0){
            this.props.editProfile.childSpecialNeeds.forEach(function(o){
                specialNeeds.push(o.value);
            })
        }
        if(this.props.editProfile.childHobbies.length > 0){
            this.props.editProfile.childHobbies.forEach(function(o){
                hobbies.push(o.value);
            })
        }
        parent.name = this.props.editProfile.name !== ""? this.props.editProfile.name: this.props.user.name;
        parent.email = this.props.editProfile.email !== ""? this.props.editProfile.email: this.props.user.email;
        parent.age = this.props.editProfile.age !== ""? this.props.editProfile.age: this.props.user.age;
        parent.maxPrice = this.props.editProfile.watchMaxPrice !== ""? this.props.editProfile.watchMaxPrice: this.props.user.maxPrice;
        parent.children = {
            name:  this.props.editProfile.childName !== ""? this.props.editProfile.childName: this.props.user.children.name,
            age: this.props.editProfile.childAge !== ""? this.props.editProfile.childAge: this.props.user.children.age,
            expertise: expertise,
            hobbies: hobbies,
            specialNeeds: specialNeeds
        };
        parent.languages = languages;
        parent.partner ={
            name: this.props.editProfile.partnerName !== ""? this.props.editProfile.partnerName: this.props.user.partner.name,
            age: this.props.editProfile.partnerAge !== ""? this.props.editProfile.partnerAge: this.props.user.partner.age,
            email: this.props.editProfile.partnerEmail !== ""? this.props.editProfile.partnerEmail: this.props.user.partner.email
        };

        request('put', sittersApi.UPDATE_USER, parent, function(result){
            if (result.data)   // user updated
                self.props.router.push('/');
        });
    }
    handleSelect(selectedKey) {
        this.props.actions.registerActions.changeRegisterView(selectedKey);
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
    next(){
        let registerViewIndex = strings.STEPS.indexOf(this.props.register.view) +1;
        this.props.actions.registerActions.changeRegisterView(strings.STEPS[registerViewIndex])
    }
}