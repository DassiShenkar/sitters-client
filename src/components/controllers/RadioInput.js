import React from 'react';
import RadioInputBase from '../../base/controllers/RadioInputBase.js';

class Radio extends RadioInputBase {

    render() {
        const options = this.props.types.map((option) => {
            return (
                <div className="radio-option" key={this.props.types.indexOf(option)}>
                    <label>
                        <input type="radio"
                               name={this.props.radioType}
                               value={option}
                               checked={option === this.props[this.props.reducer][this.props.radioType]}
                               onChange={this.handleRadio}/>
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