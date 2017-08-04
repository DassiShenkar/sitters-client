//external sources
import React from 'react';

//components
import {Button, ControlLabel, Nav, NavItem} from "react-bootstrap";
import TextInput from "../../../controllers/textInput/index";
import RadioGroup from "../../../controllers/radio/radioGroup/index";
import strings from "../../../../static/strings";
import SelectInput from "../../../controllers/select/SelectInput";
import EditProfileParentBase from "../../../base/pages/editProfile/editProfileParent/index";

export default class EditProfileParent extends EditProfileParentBase {
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
                    </div>
                </section>;
            }
            else if (view === "step2") {
                registerView =
                    <section>
                        <h2>Partner Profile</h2>
                        <TextInput label="Partner Name"
                                   placeholder='Name'
                                   defaultValue={'name' in this.props.user.partner? this.props.user.partner.name: ""}
                                   action={this.props.actions.editProfileActions.changePartnerNameEP}
                                   {...this.props}
                                   inputType={'partnerEmail'}
                                   value={this.props.editProfile.partnerName}
                                   reducer={'user'}/>
                        <TextInput label="Partner Email"
                                   type="email"
                                   placeholder='Email'
                                   defaultValue={'email' in this.props.user.partner? this.props.user.partner.email: ""}
                                   action={this.props.actions.editProfileActions.changePartnerEmailEP}
                                   value={this.props.editProfile.partnerEmail}
                                   {...this.props}
                                   reducer={'register'}/>
                        <ControlLabel>Partner Gender</ControlLabel>
                        <RadioGroup options={strings.GENDER} //TODO: do not delete - for beta
                                    defaultValue={'gender' in this.props.user.partner? this.props.user.partner: this.props.editProfile.partnerGender !== ""? this.props.editProfile.partnerGender: "Male"}
                                    action={this.props.actions.editProfileActions.changePartnerGenderEP}
                                    radioType={'partnerGender'}
                                    value={this.props.editProfile.partnerGender}
                                    required={true}/>
                    </section>
            }
            else if (view === "step3") {
                registerView =
                    <section>
                        <h2>Child Profile</h2>
                        <TextInput label="Child Name"
                                   placeholder="Child Name"
                                   action={this.props.actions.editProfileActions.changeChildNameEP}
                                   {...this.props}
                                   reducer={'user'}
                                   defaultValue={this.props.user.children.name}
                                   value={this.props.editProfile.childName}
                                   required={true}/>
                        <TextInput label="Age"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.editProfileActions.changeChildAgeEP}
                                   {...this.props}
                                   reducer={'user'}
                                   defaultValue={this.props.user.children.age}
                                   value={this.props.editProfile.childAge}
                                   required={true}/>
                        <ControlLabel>Child Difficulties</ControlLabel>
                        <SelectInput
                            placeholder="Select child Difficulties"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeChildExpertiseEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.children.expertise, this.props.editProfile.childExpertise)}/>
                        <ControlLabel>Child Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select child Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeChildHobbiesEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.children.hobbies, this.props.editProfile.childHobbies)}/>
                        <ControlLabel>Child Special Needs</ControlLabel>
                        <SelectInput
                            placeholder="Select child Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.editProfileActions.changeChildSpecialNeedsEP}
                            reducer={'register'}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.children.specialNeeds, this.props.editProfile.childSpecialNeeds)}/>
                    </section>
            }
            else if (view === "step4") {
                let personalityWords = "";
                this.props.user.personality.forEach(function(word) {
                    personalityWords += (word + ", ")
                });
                registerView =
                    <section>
                        <h2>Sitter Requirements</h2>
                        <TextInput label="Max price for babysitting hour (USD)"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.editProfileActions.changeChildMaxPriceForWatchEP}
                                   {...this.props}
                                   reducer={'register'}
                                   defaultValue={this.props.user.maxPrice}
                                   value={this.props.editProfile.watchMaxPrice}
                                   required={true}/>
                        <ControlLabel>Preferred Sitter</ControlLabel>
                        <p>{this.props.user.preferedGender}</p>
                        <ControlLabel>Languages</ControlLabel>
                        <SelectInput
                            placeholder="Select your languages"
                            options={strings.LANGUAGES}
                            {...this.props}
                            defaultValues={this.convertStringArrayToMultiSelect(this.props.user.languages, this.props.editProfile.languages)}
                            action={this.props.actions.editProfileActions.changeLanguagesEP}
                            reducer={'register'}/>
                        <p>Personality Words</p>
                        <p>{personalityWords}</p>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitParent} type="submit" className="next-btn" value="Update Profile">Update Profile</Button>: ''}
                    </section>
            }
        }
        return (
            <div>
                <form id="register-form">
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
            </div>
        );
    };
}