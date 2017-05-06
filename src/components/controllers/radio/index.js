//external sources
import React from 'react';

//base component
import RadioInputBase from '../../base/controllers/RadioInputBase.js';

//style
import './style.css';

class Radio extends RadioInputBase {

    render() {
        const options = this.props.types.map((option) => {
            return (
                <div className="radio-option" key={this.props.types.indexOf(option)}>
                    <label>
                        <input type="radio"
                               name={this.props.radioType}
                               value={this.props[this.props.reducer][this.props.radioType] !== option ? option : this.props.defaultValue}
                               checked={this.props[this.props.reducer][this.props.radioType] ? option === this.props[this.props.reducer][this.props.radioType]: this.props.defaultValue === option}
                               onChange={this.handleRadio}
                               required={this.props.required}/>
                        {option}
                    </label>
                </div>
            )
        });
        return (
            <div className="radio-group">
                {options}
            </div>
        )
    }
}
export default Radio;