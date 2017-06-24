// external sources
import React from 'react';

// components
import RadioOption from "../radioOption/index";

//style
import './style.css';

export default class RadioGroup extends React.Component {

    render() {
        const options = this.props.options.map((option) => {
            return (
                <RadioOption key={this.props.options.indexOf(option)}
                             option={option}
                             defaultValue={this.props.defaultValue}
                             action={this.props.action}
                             radioType={this.props.radioType}
                />
            )
        });
        return (
            <div className="radio-group">
                {options}
            </div>
        )
    }
}