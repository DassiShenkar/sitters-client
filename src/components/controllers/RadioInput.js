import React from 'react';
import RadioInputBase from '../../base/controllers/RadioInputBase.js';
class Radio extends RadioInputBase {// need to get default and types
    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.types.map((loan) => {
            return (
                <label>
                    <input type="radio" name="coffeeTypes" id={loan} value={loan} checked={this.state.value == loan} onChange={this.handleRadio.bind(this)}/>
                    {loan}
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