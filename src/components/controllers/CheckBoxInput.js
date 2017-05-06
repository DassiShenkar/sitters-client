import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import CheckBoxBase from '../base/controllers/CheckBoxBase'

class CheckBoxInput extends CheckBoxBase {
    render() {
        let index = 0;
        const options = this.props.types.map((option) => {
            return (
                <label key= {index++}><Checkbox value={option.label}/> {option.label}</label>
            )
        });
        return (
            <CheckboxGroup name={this.props.name} onChange={this.onChange} children=''>
                {options}
            </CheckboxGroup>
        )
    }
}
export default CheckBoxInput;