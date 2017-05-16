// external sources
import React from 'react';
import {AgeFromDate} from 'age-calculator';
import PlacesAutocomplete from 'react-places-autocomplete'

// components
import 'react-select/dist/react-select.css';

import TextInput from '../controllers/textInput/index';
import RadioGroup from '../controllers/radio/radioGroup/index';
import SelectInput from '../controllers/select/SelectInput';

// statics
import strings from '../../static/strings';

// style
import './style.css';


class BaseForm extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    calcAge(birthday) {
        let date = birthday.split("/");
        return (new AgeFromDate(new Date(parseInt(date[2],10),parseInt(date[1],10) -1, parseInt(date[0],10) -1)).age) || 0;
    }

    getLanguagesFromFacebook(languages){
        if(languages){
            return languages;
        }
        else if(this.props.user.languages){
            let langs =  [];
            this.props.user.languages.forEach(function(language){
                langs.push({value:language.name.toLowerCase(), label:language.name});
            });
            return langs;
        }
    }

    onChange(address){
        this.props.actions.registerActions.changeUserAddress(address);
    }

    render() {
        const inputProps = {
            value: this.props.user.address,
            onChange: this.onChange,
        };
        return (
            <div className="register-form">
                <TextInput label="Name"
                           placeholder='Name'
                           defaultValue={this.props.user.name}
                           action={this.props.actions.registerActions.changeName}
                           inputType={'name'} {...this.props}
                           reducer={'register'}
                           required={true}/>
                <TextInput label="Email"
                           type="email"
                           placeholder='example@gmail.com'
                           defaultValue={this.props.user.email ? this.props.user.email : ''}
                           action={this.props.actions.registerActions.changeEmail}
                           inputType={'email'} {...this.props}
                           reducer={'register'}
                           required={true}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="0"
                           defaultValue={this.props.user.birthday ? this.calcAge(this.props.user.birthday) : 0}
                           action={this.props.actions.registerActions.changeAge}
                           inputType={'age'} {...this.props}
                           reducer={'register'}
                           required={true}/>
                <h4>Address</h4>

                <PlacesAutocomplete value={this.props.register.address} inputProps={inputProps} />
                <h4>Gender</h4>
                <RadioGroup options={strings.GENDER}
                            defaultValue={this.props.user.gender ?  this.props.user.gender[0].toUpperCase() + this.props.user.gender.slice(1): 'Female'}
                            action={this.props.actions.registerActions.changeGender}
                            radioType={'gender'} {...this.props}
                            value={ this.props.user.userType }
                            />
                <h4>Languages</h4>
                <SelectInput
                    placeholder="Select your languages"
                    options={strings.LANGUAGES}
                    {...this.props}
                    defaultValues={this.getLanguagesFromFacebook(this.props.register.languages)}
                    action={this.props.actions.registerActions.changeLanguages}
                    reducer={'register'}/>
            </div>
        )
    };
}

export default BaseForm;