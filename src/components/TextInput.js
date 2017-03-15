import React from 'react';
import TextInputBase from '../base/TextInputBase.js'

class TextInput extends TextInputBase {

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.state = {value: ''}
        console.log(this.props.type);
    };

    getValue(){
        return this.state.value;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    render() {
        let label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
        let type = this.props.type !== '' ?  this.props.type: 'text';
        let placeholder = this.props.placeholder !== ''? this.props.placeholder : '';
        return (
            <div className="text-input">
                {label}
                <input type={type} id="textInput" placeholder={placeholder} ref="textInput" onChange={this.handleChange} />
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


