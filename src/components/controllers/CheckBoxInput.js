import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import CheckBoxBase from '../../base/controllers/CheckBoxBase'

class CheckBoxInput extends CheckBoxBase {
    render() {
        const options = this.props.types.map((name) => {
            return (
                <label key={this.props.types.indexOf(name)}><Checkbox value={name}/> {name}</label>
            )
        });
        return (
            <div>
                <CheckboxGroup name={this.props.name} onChange={this.onChange} children=''>
                    {options}
                </CheckboxGroup>
            </div>
        )
    }
}
export default CheckBoxInput;