import React from 'react';
import RadioInputBase from '../../base/controllers/RadioInputBase.js';
class Radio extends RadioInputBase {// need to get default and types
    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.types.map((option) => {
            return (
                <label key={this.props.types.indexOf(option)}>
                    <input type="radio"  id={option} value={option} checked={this.state.value === option} onChange={this.handleRadio.bind(this)}/>
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