//external sources
import React from 'react';
import * as _ from "lodash";

//components
import {Button, ControlLabel, FormControl, Nav, NavItem, Table} from "react-bootstrap";
import TextInput from "../../../controllers/textInput/index";
import SelectInput from "../../../controllers/select/SelectInput";
import EditProfileSitterBase from "../../../base/pages/editProfile/editProfileSitter/index";

//statics
import strings from "../../../../static/strings";

//style
import 'react-select/dist/react-select.css';

export default class EditProfileSitter extends EditProfileSitterBase {
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
                        <ControlLabel>Expertise</ControlLabel>
                        <SelectInput
                            placeholder="Select Expertise"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterExpertiseEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.expertise, this.props.editProfile.sitterExpertise)}/>
                        <ControlLabel>Special Needs Qualifications</ControlLabel>
                        <SelectInput
                            placeholder="Select Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterSpecialNeedsEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.specialNeeds, this.props.editProfile.sitterSpecialNeeds)}/>
                        <ControlLabel>Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeSitterHobbiesEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.hobbies, this.props.editProfile.sitterHobbies)}/>
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