//external sources
import React from 'react';

//components
import Icon from '../../../icon';
import RadioInputBase from "../../../base/controllers/radio/index";

//style
import './style.css';

export default class RadioOption extends RadioInputBase {
    render() {
        return (
            <div className="radio-option" >
                <label>
                    <input type="radio"
                           name={this.props.radioType}
                           value={this.props.option}
                           checked={this.props.defaultValue === this.props.option}
                           onChange={this.handleRadio}
                           required={this.props.required}/>
                    <Icon name={this.props.defaultValue === this.props.option ? "icon-dot-circle-o" : "icon-circle-o"}/>{this.props.option}</label>
            </div>
        )
    }
}