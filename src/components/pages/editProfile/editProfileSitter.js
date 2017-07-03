import React from 'react';

import 'react-select/dist/react-select.css';
import {AgeFromDate} from 'age-calculator';
import axios from 'axios';
import {Button, ControlLabel, FormControl, Nav, NavItem, Table} from "react-bootstrap";
import './style.css';
import {geocodeByAddress} from "react-places-autocomplete";
import * as _ from "lodash";
import TextInput from "../../controllers/textInput/index";
import SelectInput from "../../controllers/select/SelectInput";
import strings from "../../../static/strings";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.convertStringArrayToMultiSelect = this.convertStringArrayToMultiSelect.bind(this);
    }

    // getGeoCode(callback) {
    //     geocoder.geocode(this.props.register.street + " " + this.props.register.houseNumber + ", " + this.props.register.city, function (err, data) {
    //         if (err)
    //             console.log(err); // TODO: when address is wrong, add callback
    //         else {
    //             callback(data);
    //         }
    //     });
    // }



    // getEducationFromFacebook(education, selectInput) {// selectInput or array of strings
    //     if (education) {
    //         return education;
    //     }
    //     else if (this.props.user.education) {
    //         let edu = [], eduList = [];
    //         this.props.user.education.forEach(function (obj) {
    //             if (eduList.indexOf(obj.type) === -1) {
    //                 edu.push({value: obj.type.toLowerCase(), label: obj.type});
    //                 eduList.push(obj.type);
    //             }
    //         });
    //         return selectInput? edu: eduList;
    //     }
    // }

    // getLanguagesFromFacebook(languages){
    //     if(languages){
    //         return languages;
    //     }
    //     else if(this.props.user.languages){
    //         let langs =  [];
    //         this.props.user.languages.forEach(function(language){
    //             langs.push({value:language.name.toLowerCase(), label:language.name});
    //         });
    //         return langs;
    //     }
    // }

    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, parseInt(date[0], 10) - 1)).age) || 0;
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
        // let langs = this.props.register.languages ? this.props.register.languages : this.props.user.languages;
        // let languages = [];
        // let cords = {};
        // if (langs) {
        //     langs.forEach(function (language) {
        //         if (self.props.register.languages)
        //             languages.push(language.value);
        //         else
        //             languages.push(language.name);
        //     });
        // }

        if(this.props.editProfile.languages.length > 0){
            this.props.editProfile.languages.forEach(function(o){
                languages.push(o.value);
            })
        }
        if(this.props.editProfile.sitterExpertise.length > 0){
            this.props.editProfile.sitterExpertise.forEach(function(o){
                expertise.push(o.value);
            })
        }
        if(this.props.editProfile.sitterSpecialNeeds.length > 0){
            this.props.editProfile.sitterSpecialNeeds.forEach(function(o){
                specialNeeds.push(o.value);
            })
        }
        if(this.props.editProfile.sitterHobbies.length > 0){
            this.props.editProfile.sitterHobbies.forEach(function(o){
                hobbies.push(o.value);
            })
        }
        if (this.props.editProfile.sitterEducation.length > 0) {
            this.props.editProfile.sitterEducation.forEach(function (o) {
                education.push(o.value);
            });
        }
        sitter.name = this.props.editProfile.name !== ""? this.props.editProfile.name: this.props.user.name;
        sitter.email = this.props.editProfile.email !== ""? this.props.editProfile.email: this.props.user.email;
        sitter.age = this.props.editProfile.age !== ""? this.props.editProfile.age: this.props.user.age;
        sitter.motto = this.props.editProfile.sitterMotto !== ""? this.props.editProfile.sitterMotto: this.props.user.motto;
        sitter.expertise =expertise;
        sitter.hobbies =hobbies;
        sitter.specialNeeds = specialNeeds;
        sitter.languages = languages;
        sitter.education = education;
        sitter.hourFee = this.props.editProfile.hourFee !== ""? this.props.editProfile.hourFee: this.props.user.hourFee;
        sitter.experience = this.props.editProfile.sitterExperience !== ""? this.props.editProfile.sitterExperience: this.props.user.experience;
        sitter.minAge = this.props.editProfile.sitterMinAge !== ""? this.props.editProfile.sitterMinAge: this.props.user.minAge;
        sitter.maxAge = this.props.editProfile.sitterMaxAge !== ""? this.props.editProfile.sitterMaxAge: this.props.user.maxAge;

        axios({
            method: 'post',
            url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/update',
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            data: sitter
        }).then(function (res) {
            if (res.data) {  // user updated
                self.props.router.push('/');
            }
            else { // user not updated
                //TODO: think about error when user not created
            }
        })
            .catch(function (error) {
                console.log(error);
                //TODO: think about error when user not created
            });



        //
        //
        // geocodeByAddress(this.props.user.address,  (err, latLng) => {
        //     if (err) {
        //         console.log('Oh no!', err)
        //     }
        //     else {
        //         let add = self.props.user.address.split(',');
        //         const street = add[0].split(' ');
        //         let houseNumber = street.pop();
        //         if (Number.isNaN(houseNumber)) {
        //             street.push(houseNumber);
        //             houseNumber = 0;
        //         }
        //         const address = {
        //             city: self.props.user.address.split(',')[1],
        //             street: _.join(street, " "),
        //             houseNumber: Number(houseNumber),
        //             longitude: latLng.lng,
        //             latitude: latLng.lat
        //         };
        //         sitter.address = address;
        //         axios({
        //             method: 'post',
        //             url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/create',
        //             headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        //             data: sitter
        //         }).then(function (res) {
        //             if (res.data) {  // user created
        //                 if(self.props.user.friends.length > 0){
        //                     axios({
        //                         method: 'post',
        //                         url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
        //                         headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        //                         data: {_id: self.props.user.facebookID}
        //                     })
        //                         .then(function (response) {
        //                             if (response.data) {  // user exists
        //                                 axios({
        //                                     method: 'post',
        //                                     url: (strings.DEBUG?strings.LOCALHOST : strings.WEBSITE ) + 'sitter/updateMutualFriends',
        //                                     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        //                                     data: response.data
        //                                 })
        //                                     .then(function (response) {
        //                                         document.cookie = ("auth_token="+self.props.user.facebookID);
        //                                         self.props.actions.actionCreators.changeIsParentFlag(false);
        //                                         self.props.router.push('/');
        //                                     })
        //                                     .catch(function (error) {
        //                                         console.log(error);
        //                                     });
        //                             }
        //                         })
        //                         .catch(function (error) {
        //                             console.log(error);
        //                         });
        //                 }
        //
        //             }
        //             else { // user not created
        //                 //TODO: think about error when user not created
        //             }
        //         })
        //             .catch(function (error) {
        //                 console.log(error);
        //                 //TODO: think about error when user not created
        //             });
        //     }
        // });
    }
    handleSelect(selectedKey) {
        this.props.actions.registerActions.changeRegisterView(selectedKey);
    }

    next(){
        let registerViewIndex = strings.STEPS.indexOf(this.props.register.view) +1;
        this.props.actions.registerActions.changeRegisterView(strings.STEPS[registerViewIndex])
    }
    render() {
        let registerView = null;
        if (this.props.register.view !== null) {
            let view = this.props.register.view;
            if (view === "step1") {
                registerView = <section>
                    <h2>Your Profile</h2>
                    <div className="register-form">
                        <TextInput label="Name"
                                   placeholder='Name'
                                   defaultValue={this.props.user.name}
                                   action={this.props.actions.editProfileActions.changeNameEP}
                                   inputType={'name'}
                                   {...this.props}
                                   reducer={'user'}
                                   value={this.props.editProfile.name}
                                   required={true}/>
                        <TextInput label="Email"
                                   type="email"
                                   placeholder='example@gmail.com'
                                   defaultValue={this.props.user.email}
                                   action={this.props.actions.editProfileActions.changeEmailEP}
                                   inputType={'email'} {...this.props}
                                   value={this.props.editProfile.email}
                                   reducer={'user'}
                                   required={true}/>
                        <TextInput label="Age"
                                   type="number"
                                   placeholder="0"
                                   defaultValue={this.props.user.age}
                                   action={this.props.actions.editProfileActions.changeAgeEP}
                                   inputType={'age'} {...this.props}
                                   reducer={'user'}
                                   value={this.props.editProfile.age}
                                   required={true}/>
                        <ControlLabel>Address</ControlLabel>
                        <p>{this.props.user.address.street + " " + this.props.user.address.houseNumber + ", " + this.props.user.address.city}</p>
                        <ControlLabel>Gender</ControlLabel>
                        <p>{this.props.user.gender}</p>
                        <ControlLabel>Languages</ControlLabel>
                        <SelectInput
                            placeholder="Select your languages"
                            options={strings.LANGUAGES}
                            {...this.props}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.languages, this.props.editProfile.languages)}
                            action={this.props.actions.editProfileActions.changeLanguagesEP}
                            reducer={'register'}/>
                        {/*<ControlLabel>Languages</ControlLabel>*/}
                        {/*<SelectInput*/}
                            {/*placeholder="Select your languages"*/}
                            {/*options={strings.LANGUAGES}*/}
                            {/*{...this.props}*/}
                            {/*defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}*/}
                            {/*action={this.props.actions.registerActions.changeLanguages}*/}
                            {/*reducer={'register'}/>*/}
                    </div>
                </section>;
            }
            else if (view === "step2") {
                registerView =
                    <section>
                        <h2>Your Experience</h2>
                        <TextInput label="Years of Experience"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.editProfileActions.changeSitterExperienceEP}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}
                                   defaultValue={this.props.user.experience}
                                   value={this.props.editProfile.sitterExperience}
                        />


                        {/*<TextInput label="Name"*/}
                        {/*placeholder='Name'*/}
                        {/*defaultValue={this.props.user.name}*/}
                        {/*action={this.props.actions.editProfileActions.changeNameEP}*/}
                        {/*inputType={'name'}*/}
                        {/*{...this.props}*/}
                        {/*reducer={'user'}*/}
                        {/*value={this.props.editProfile.name}*/}
                        {/*required={true}/>*/}


                        <ControlLabel>Immediate Availability</ControlLabel>
                        <p>{this.props.user.availableNow? "True": "False"}</p>
                        <ControlLabel>Education</ControlLabel>
                        <SelectInput
                            placeholder="Select your education level"
                            options={strings.EDUCATION}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterEducationEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.education, this.props.editProfile.sitterEducation)}/>
                        {/*<SelectInput*/}
                        {/*placeholder="Select your education level"*/}
                        {/*options={strings.EDUCATION}*/}
                        {/*{...this.props}*/}
                        {/*defaultValues={this.getEducationFromFacebook(this.props.register.sitterEducation)}*/}
                        {/*action={this.props.actions.registerActions.changeSitterEducation}*/}
                        {/*reducer={'register'}/>*/}
                        <ControlLabel>Expertise</ControlLabel>
                        <SelectInput
                            placeholder="Select Expertise"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterExpertiseEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.expertise, this.props.editProfile.sitterExpertise)}/>
                        {/*<SelectInput*/}
                        {/*placeholder="Select Expertise"*/}
                        {/*options={strings.EXPERTISE}*/}
                        {/*{...this.props}*/}
                        {/*action={this.props.actions.registerActions.changeSitterExpertise}*/}
                        {/*reducer={'register'}*/}
                        {/*defaultValues={this.props.register.sitterExpertise}/>*/}
                        <ControlLabel>Special Needs Qualifications</ControlLabel>
                        <SelectInput
                            placeholder="Select Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterSpecialNeedsEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.specialNeeds, this.props.editProfile.sitterSpecialNeeds)}/>
                        {/*<SelectInput*/}
                        {/*placeholder="Select Special Needs"*/}
                        {/*options={strings.SPECIAL_NEEDS}*/}
                        {/*{...this.props}*/}
                        {/*action={this.props.actions.registerActions.changeSitterSpecialNeeds}*/}
                        {/*reducer={'register'}*/}
                        {/*defaultValues={this.props.register.sitterSpecialNeeds}/>*/}
                        <ControlLabel>Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterHobbiesEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.hobbies, this.props.editProfile.sitterHobbies)}/>
                        {/*<SelectInput*/}
                        {/*placeholder="Select Hobbies"*/}
                        {/*options={strings.HOBBIES}*/}
                        {/*{...this.props}*/}
                        {/*action={this.props.actions.registerActions.changeSitterHobbies}*/}
                        {/*reducer={'register'}*/}
                        {/*defaultValues={this.props.register.sitterHobbies}/>*/}
                    </section>
            }
            else if (view === "step3") {
                const self = this;
                const workingHours = Object.keys(this.props.user.workingHours).map(function (day, index) {
                    return (
                        <tr key={index}>
                            <td>{day[0].toUpperCase() + day.slice(1)}</td>
                            <td>{_.join(self.props.user.workingHours[day], ', ')}</td>
                        </tr>
                    )
                });
                registerView =
                    <section>
                        <h2>Your Requirements</h2>
                        {/*<TextInput label="Years of Experience"*/}
                                   {/*type="number"*/}
                                   {/*placeholder="0"*/}
                                   {/*action={this.props.actions.editProfileActions.changeSitterExperienceEP}*/}
                                   {/*{...this.props}*/}
                                   {/*reducer={'register'}*/}
                                   {/*required={true}*/}
                                   {/*defaultValue={this.props.user.experience}*/}
                                   {/*value={this.props.editProfile.sitterExperience}*/}
                        {/*/>*/}
                        <TextInput label="Works with Children from Age:"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.editProfileActions.changeSitterMinimumAgeEP}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}
                                       defaultValue={this.props.user.minAge}
                                       value={this.props.editProfile.sitterMinAge}/>
                        <TextInput label="To Age:"
                                   type="number"
                                   placeholder="12"
                                   action={this.props.actions.editProfileActions.changeSitterMaximumAgeEP}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}
                                   defaultValue={this.props.user.maxAge}
                                   value={this.props.editProfile.sitterMaxAge}/>
                        <TextInput label="Hour Fee"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.editProfileActions.changeSitterHourFeeEP}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}
                                   defaultValue={this.props.user.hourFee}
                                   value={this.props.editProfile.hourFee}/>
                        <h3>Working Hours</h3>
                        <Table className="info-table" responsive>
                            <thead>
                            <tr>
                                <th>Day</th>
                                <th>Availability</th>
                            </tr>
                            </thead>
                            <tbody>
                            {workingHours}
                            </tbody>
                        </Table>
                        {/*<WorkingHours*/}
                        {/*days={strings.WEEK_DAYS}*/}
                        {/*hours={strings.HOURS}*/}
                        {/*action={this.props.actions.workingHoursActions.changeWorkingHours}/>*/}
                    </section>
            }
            else if (view === "step4") {
                let personalityWords = "";
                this.props.user.personality.forEach(function(word) {
                    personalityWords += (word + ", ")
                });
                let mobility = "";
                this.props.user.mobility.forEach(function(obj) {
                    mobility += (obj + ", ")
                });
                registerView =
                    <section>
                        <h2>Your Spirit</h2>
                        <ControlLabel>Sitter Mobility</ControlLabel>
                        {/*<CheckBoxInput name="sitterMobility"*/}
                                       {/*types={strings.MOBILITY}*/}
                                       {/*action={this.props.actions.registerActions.changeSitterMobility}*/}
                                       {/*{...this.props}*/}
                                       {/*reducer={'register'}*/}
                        {/*/>*/}
                        {mobility}
                        <ControlLabel>Your Motto</ControlLabel>
                        <FormControl value={this.props.editProfile.sitterMotto !== ""? this.props.editProfile.sitterMotto: this.props.user.motto} required maxLength="140" componentClass="textarea" placeholder="motto" onChange={(e) => this.props.actions.editProfileActions.changeSitterMottoEP(e.target.value)} />
                        <p>Personality Words</p>
                        <p>{personalityWords}</p>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitParent} type="submit" className="next-btn" value="Update Profile">Update Profile</Button>: ''}
                    </section>
            }
        }
        return (
            <form className="sitter-form" onSubmit={this.handleSubmitSitter}>
                <Nav activeKey={"step1"} justified onSelect={this.handleSelect.bind(this)}>
                    <NavItem className={this.props.register.view === "step1"? "active-register-nav":""} eventKey="step1" title="location">Step 1</NavItem>
                    <NavItem className={this.props.register.view === "step2"? "active-register-nav":""} eventKey="step2">Step 2</NavItem>
                    <NavItem className={this.props.register.view === "step3"? "active-register-nav":""} eventKey="step3">Step 3</NavItem>
                    <NavItem className={this.props.register.view === "step4"? "active-register-nav":""} eventKey="step4">Step 4</NavItem>
                </Nav>
                {registerView}
                {strings.STEPS.indexOf(this.props.register.view) !== (strings.STEPS.length -1)?
                    <Button onClick={this.next.bind(this)} type="button" className="next-btn" value="Next">Next</Button>: ''}
            </form>
        );
    };
}

export default Form;