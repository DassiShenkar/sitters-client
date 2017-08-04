//external sources
import React from 'react';

//components
import {Button, ControlLabel, FormControl, Nav, NavItem} from "react-bootstrap";
import SelectInput from "../../../controllers/select/index";
import RadioGroup from "../../../controllers/radio/index";
import BaseForm from '../base/index';
import TextInput from '../../../controllers/textInput/index';
import WorkingHours from "../../../controllers/workingHours/index";
import CheckBoxInput from "../../../controllers/checkbox/index";
import DragAndDropContainer from "../../../dragAndDropContainer/index";
import SitterFormBase from "../../../base/pages/forms/sitterForm/index";

//statics
import strings from '../../../../static/strings';

//styles
import '../style.css';
import 'react-select/dist/react-select.css';

export default class SitterForm extends SitterFormBase {
    render() {
        let registerView = null;
        if (this.props.register.view !== null) {
            let view = this.props.register.view;
            if (view === "step1") {
                registerView = <section>
                    <h2>Your Profile</h2>
                    <BaseForm {...this.props}/>
                    <ControlLabel>Languages</ControlLabel>
                    <SelectInput
                        placeholder="Select your languages"
                        options={strings.LANGUAGES}
                        {...this.props}
                        defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}
                        action={this.props.actions.registerActions.changeLanguages}
                        reducer={'register'}/>
                </section>;
            }
            else if (view === "step2") {
                registerView =
                    <section>
                        <h2>Your Experience</h2>
                        <TextInput label="Years of Experience"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeSitterExperience}
                                   defaultValue={this.props.register.sitterExperience}
                                   value={this.props.register.sitterExperience}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <ControlLabel>Immediate Availability</ControlLabel>
                        <RadioGroup options={strings.BOOLEAN}
                                    action={this.props.actions.registerActions.changeSitterImmediateAvailability}
                                    radioType={'sitterImmediateAvailability'}
                                    defaultValue={this.props.register.sitterImmediateAvailability? this.props.register.sitterImmediateAvailability: strings.BOOLEAN[1]}
                                    required={true}/>
                        <ControlLabel>Education</ControlLabel>
                        <SelectInput
                            placeholder="Select your education level"
                            options={strings.EDUCATION}
                            {...this.props}
                            defaultValues={this.getEducationFromFacebook(this.props.register.sitterEducation)}
                            action={this.props.actions.registerActions.changeSitterEducation}
                            reducer={'register'}/>
                        <ControlLabel>Expertise</ControlLabel>
                        <SelectInput
                            placeholder="Select Expertise"
                            options={strings.EXPERTISE}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterExpertise}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterExpertise}/>
                        <ControlLabel>Special Needs Qualifications</ControlLabel>
                        <SelectInput
                            placeholder="Select Special Needs"
                            options={strings.SPECIAL_NEEDS}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterSpecialNeeds}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterSpecialNeeds}/>
                        <ControlLabel>Hobbies</ControlLabel>
                        <SelectInput
                            placeholder="Select Hobbies"
                            options={strings.HOBBIES}
                            {...this.props}
                            action={this.props.actions.registerActions.changeSitterHobbies}
                            reducer={'register'}
                            defaultValues={this.props.register.sitterHobbies}/>
                    </section>
            }
            else if (view === "step3") {
                registerView =
                    <section>
                        <h2>Your Requirements</h2>
                        <TextInput label="Works with Children from Age:"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeSitterMinimumAge}
                                   defaultValue={this.props.register.sitterMinAge}
                                   value={this.props.register.sitterMinAge}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <TextInput label="To Age:"
                                   type="number"
                                   placeholder="12"
                                   action={this.props.actions.registerActions.changeSitterMaximumAge}
                                   defaultValue={this.props.register.sitterMaxAge}
                                   value={this.props.register.sitterMaxAge}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <TextInput label="Hour Fee"
                                   type="number"
                                   placeholder="0"
                                   action={this.props.actions.registerActions.changeSitterHourFee}
                                   defaultValue={this.props.register.hourFee}
                                   value={this.props.register.hourFee}
                                   {...this.props}
                                   reducer={'register'}
                                   required={true}/>
                        <h3>Working Hours</h3>
                        <WorkingHours
                            days={strings.WEEK_DAYS}
                            hours={strings.HOURS}
                            action={this.props.actions.workingHoursActions.changeWorkingHours}/>
                    </section>
            }
            else if (view === "step4") {
                registerView =
                    <section>
                        <h2>Your Spirit</h2>
                        <ControlLabel>Sitter Mobility</ControlLabel>
                        <CheckBoxInput name="sitterMobility"
                                       types={strings.MOBILITY}
                                       action={this.props.actions.registerActions.changeSitterMobility}
                                       {...this.props}
                                       reducer={'register'}
                        />
                        <ControlLabel>Your Motto</ControlLabel>
                        <FormControl required maxLength="140" componentClass="textarea" placeholder="motto" onChange={(e) => this.props.actions.registerActions.changeSitterMotto(e.target.value)} />
                        <DragAndDropContainer {...this.props}/>
                        {strings.STEPS.indexOf(this.props.register.view) === (strings.STEPS.length -1)?
                            <Button onClick={this.handleSubmitSitter} type="submit" className="next-btn" value="Sign Up">Sign Up</Button>: ''}
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