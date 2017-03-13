import React from 'react';
import TextInputBase from '../base/TextInputBase.js'

class TextInput extends TextInputBase {

    constructor(props) {
        super(props);
        this.state = {value: 'placeholder'}
    };

    render() {
        let label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
        return (
            <div className="text-input">
                {label}
                <input type="text" id="textInput" ref="textInput" value={this.state.value}/>
            </div>
        );
    }
}

TextInput.propTypes = {
    label: React.PropTypes.string
};

TextInput.defaultProps = {
    label: 'label',
};

export default TextInput;


