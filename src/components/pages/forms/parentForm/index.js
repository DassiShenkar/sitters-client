import React from 'react';
import TextInput from '../../../controllers/textInput/index';
import BaseForm from '../base/index';
import axios from 'axios';
import strings from '../../../../static/strings';
import {AgeFromDate} from 'age-calculator';
import RadioGroup from "../../../controllers/radio/index";
import {Button, ControlLabel, Nav, NavItem} from "react-bootstrap";
import SelectInput from "../../../controllers/select/index";
import {geocodeByAddress} from "react-places-autocomplete";

//style
import '../style.css';
import * as _ from "lodash";
import DragAndDropContainer from "../dragAndDropContainer/index";
import ParentFormBase from "../../../base/pages/forms/parentForm/index";

export default class ParentForm extends ParentFormBase {
    render() {
        let registerView = null;
        if (this.props.register.view !== null) {
            let view = this.props.register.view;
            if (view === "step1") {
                registerView = <section>
                    <h2>Your Profile</h2>
                    <BaseForm {...this.props}/>
                </section>;
            }
            else if (view === "step2") {
                const partner =
                    <section>
                        <TextInput label="Partner Name"
                                   placeholder='Name'
                                   defaultValue={this.props.register.partnerName}
                                   value={this.props.register.partnerName}
                                   action={this.props.actions.registerActions.changePartnerName}
                                   inputType={'partnerName'}
                                   {...this.props}
                                   reducer={'register'}/>
                        <TextInput label="Partner Email"
                                   type="email"
                                   placeholder='Email'
                                   defaultValue={this.props.register.partnerEmail}
                                   value={this.props.register.partnerEmail}
                                   inputType={'partnerEmail'}
                                   action={this.props.actions.registerActions.changePartnerEmail}
                                   {...this.props}
                                   reducer={'register'}/>
                        <ControlLabel>Partner Gender</ControlLabel>
                        <RadioGroup options={strings.GENDER}
                                    action={this.props.actions.registerActions.changePartnerGender}
                                    radioType={'partnerGender'}
                                    defaultValue={this.props.register.partnerGender? this.props.register.partnerGender: strings.GENDER[0]}
                                    required={true}/>
                    </section>;
                registerView =
                    <section>
                        <h2>Partner Profile</h2>
                        <ControlLabel>Do you have a partner?</ControlLabel>
                        <RadioGroup options={strings.BOOLEAN}
                                    action={this.props.actions.registerActions.changeHavePartner}
                                    radioType={'partner'}
                                    defaultValue={this.props.register.havePartner? this.props.register.havePartner: strings.BOOLEAN[1]}
                                    required={true}
                        />
                        {this.props.register.havePartner === 'True'? partner: ""}
                    </section>
            }
            else if (view === "step3") {
                registerView =
                    <section>
                        <h2>Child Profile</h2>
                        <TextInput label="Child Name"
                                   placeholder="Child Name"
                                   action={this.props.actions.registerActions.changeChildName}
                                   defaultValue={this.props.register.childName}
                                   value={this.props.register.childName}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <TextInput label="Age"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeChildAge}
                                   defaultValue={this.props.register.childAge}
                                   value={this.props.register.childAge}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <ControlLabel>Child Difficulties</ControlLabel>
                        <SelectInput
                            placeholder="Select child Difficulties"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildExpertise}
                            reducer={'register'}
                            defaultValues={this.props.register.childExpertise}/>
                        <ControlLabel>Child Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select child Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildHobbies}
                            reducer={'register'}
                            defaultValues={this.props.register.childHobbies}/>
                        <ControlLabel>Child Special Needs</ControlLabel>
                        <SelectInput
                            placeholder="Select child Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.registerActions.changeChildSpecialNeeds}
                            reducer={'register'}
                            defaultValues={this.props.register.childSpecialNeeds}/>
                    </section>
            }
            else if (view === "step4") {
                registerView =
                    <section>
                        <h2>Sitter Requirements</h2>
                        <TextInput label="Max price for babysitting hour (USD)"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeChildMaxPriceForWatch}
                                   defaultValue={this.props.register.watchMaxPrice}
                                   value={this.props.register.watchMaxPrice}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <ControlLabel>Preferred Sitter</ControlLabel>
                        <RadioGroup options={strings.GENDER_WITH_BOTH}
                                    action={this.props.actions.registerActions.changeGenderWatchChild}
                                    defaultValue={this.props.register.watchChildGender? this.props.register.watchChildGender: strings.GENDER_WITH_BOTH[0]}
                                    radioType={'genderWatch'}
                                    value={this.props.register.watchChildGender}/>
                        <ControlLabel>Languages</ControlLabel>
                        <SelectInput
                            placeholder="Select your languages"
                            options={strings.LANGUAGES}
                            {...this.props}
                            defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}
                            action={this.props.actions.registerActions.changeLanguages}
                            reducer={'register'}/>
                        <p>Please drag and drop <b>6</b> words to describe the personality of your dream Sitter.</p>
                        <DragAndDropContainer {...this.props}/>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitParent} type="submit" className="next-btn" value="Sign Up">Sign Up</Button>: ''}
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