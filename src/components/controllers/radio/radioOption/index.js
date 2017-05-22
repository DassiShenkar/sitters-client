//external sources
import React from 'react';

//base component
import RadioInputBase from '../../../base/controllers/radioBase/index.js';

//style
import './style.css';

export default class RadioOption extends RadioInputBase {

    render() {
            return (
                <div className="radio-option" >
                    <label>
                        <input type="radio"
                               name={this.props.radioType}
                               value={this.props.userType !== this.props.option ? this.props.option : this.props.defaultValue}
                               checked={this.props.option === this.props.value}
                               onChange={this.handleRadio}
                               required={this.props.required}/>
                        {this.props.option}
                    </label>
                </div>
            )
        }
}