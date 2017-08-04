// external sources
import React from 'react';

// components
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import CheckBoxBase from '../../base/controllers/checkBox/index'

export default class CheckBoxInput extends CheckBoxBase {
    render() {
        const options = this.props.types.map((option) => {
            return (
                <label key={this.props.types.indexOf(option)}>
                    <Checkbox value={option}/> {option}
                </label>
            )
        });
        return (
            <CheckboxGroup name={this.props.name} onChange={this.onChange} children=''>
                {options}
            </CheckboxGroup>
        )
    }
}