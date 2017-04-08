import React from 'react';
import TextInput from './controllers/TextInput';
import RadioInput from './controllers/RadioInput';
import 'react-select/dist/react-select.css';
import SelectInput from './controllers/SelectInput';
import baseData from '../data/BaseData';
import strings from '../static/strings';
class BaseForm extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <TextInput label="Name"
                           placeholder="Moshe Levi"
                           action={this.props.actions.registerActions.changeName}
                           inputType={'name'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Email"
                           type="email"
                           placeholder="Enter your email"
                           action={this.props.actions.registerActions.changeEmail}
                           inputType={'email'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Age"
                           type="number"
                           placeholder="25"
                           action={this.props.actions.registerActions.changeAge}
                           inputType={'age'} {...this.props}
                           reducer={'register'}/>
                <h4>Address</h4>
                <TextInput label="City"
                           placeholder="Tel Aviv"
                           action={this.props.actions.registerActions.changeCity}
                           inputType={'city'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="Name"
                           placeholder="Arlozorov"
                           action={this.props.actions.registerActions.changeStreet}
                           inputType={'street'} {...this.props}
                           reducer={'register'}/>
                <TextInput label="House Number"
                           type="number"
                           placeholder="37"
                           action={this.props.actions.registerActions.changeHouseNumber}
                           inputType={'houseNumber'} {...this.props}
                           reducer={'register'}/>
                <h3>Gender</h3>
                <RadioInput types={strings.GENDER}
                            action={this.props.actions.registerActions.changeGender}
                            radioType={'gender'} {...this.props}
                            reducer={'register'}/>
                <h4>Languages</h4>
                <SelectInput
                    placeholder="Select your languages"
                    options={baseData.getLanguages()}
                    {...this.props}
                    defaultLanguages={this.props.register.languages}
                    action={this.props.actions.registerActions.changeLanguages}
                    inputType={'languages'} {...this.props}
                    reducer={'register'}/>
                )
            </div>
        )
    };
}

export default BaseForm;