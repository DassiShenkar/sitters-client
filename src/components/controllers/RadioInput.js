import React from 'react';
import RadioInputBase from '../../base/controllers/RadioInputBase.js';

class Radio extends RadioInputBase {

    render() {
        const options = this.props.types.map((option) => {
            return (
                <div>
                    <label key={this.props.types.indexOf(option)}>
                        <input type="radio" name={this.props.radioName} value={option} checked={this.state.value === option}
                               onChange={this.handleRadio}/>
                        {option}
                    </label>
                </div>
            )
        });
        return (
            <div>
                {options}
            </div>
        )
    }
}
export default Radio;