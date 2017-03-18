import React from 'react';
import RadioInputBase from '../../base/controllers/RadioInputBase.js';

class Radio extends RadioInputBase {

    render() {
        const options = this.props.types.map((option) => {
            return (
                <label key={this.props.types.indexOf(option)}>
                    <input type="radio" name={option} value={option} checked={this.state.value === option}
                           onChange={this.handleRadio}/>
                    {option}
                </label>
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