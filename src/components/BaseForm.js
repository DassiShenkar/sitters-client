import React from 'react';
import TextInput from './controllers/TextInput';
import RadioInput from './controllers/RadioInput';
import 'react-select/dist/react-select.css';
import SelectInput from './controllers/SelectInput';
import baseData from '../data/BaseData';
import strings from '../static/strings';
import {AgeFromDate} from 'age-calculator';


class BaseForm extends React.Component {

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
        return;

    }

    render() {
        return (
            <div>
                <TextInput label="Name"
                           placeholder='Name'
                           defaultValue={this.props.user.name}
                           action={this.props.actions.registerActions.changeName}
                           inputType={'name'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Email"
                           type="email"
                           placeholder='Email'
                           defaultValue={this.props.user.email ? this.props.user.email : ''}
                           action={this.props.actions.registerActions.changeEmail}
                           inputType={'email'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="0"
                           defaultValue={this.props.user.birthday ? this.calcAge(this.props.user.birthday) : 0}
                           action={this.props.actions.registerActions.changeAge}
                           inputType={'age'} {...this.props}
                           reducer={'register'}/>
                <h4>Address</h4>
                <TextInput label="City"
                           placeholder="City"
                           defaultValue={this.props.user.location ? this.props.user.location.name.split(',')[0] : ''}
                           action={this.props.actions.registerActions.changeCity}
                           inputType={'city'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Street"
                           placeholder="Street"
                           action={this.props.actions.registerActions.changeStreet}
                           inputType={'street'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="House Number"
                           type="number"
                           placeholder="0"
                           action={this.props.actions.registerActions.changeHouseNumber}
                           inputType={'houseNumber'} {...this.props}
                           reducer={'register'}/>
                <h3>Gender</h3>
                <RadioInput types={strings.GENDER}
                            defaultValue={this.props.user.gender ?  this.props.user.gender[0].toUpperCase() + this.props.user.gender.slice(1): 'Female'}
                            action={this.props.actions.registerActions.changeGender}
                            radioType={'gender'} {...this.props}
                            reducer={'register'}/>
                <h4>Languages</h4>
                <SelectInput
                    placeholder="Select your languages"
                    options={baseData.getLanguages()}
                    {...this.props}
                    defaultLanguages={this.getLanguagesFromFacebook(this.props.register.languages)}
                    action={this.props.actions.registerActions.changeLanguages}
                    {...this.props}
                    reducer={'register'}/>
            </div>
        )
    };
}

export default BaseForm;