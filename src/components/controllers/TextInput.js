import React from 'react';
import TextInputBase from '../../base/controllers/TextInputBase.js'
import {ControlLabel, FormControl} from 'react-bootstrap'
class TextInput extends TextInputBase {

    render() {
        const value = this.props[this.props.reducer][this.props.inputType]  ? this.props[this.props.reducer][this.props.inputType] : this.props.defaultValue;
        return (
            <div className="text-input">
                <ControlLabel>{this.props.label}</ControlLabel>
                {/*<label>{this.props.label}</label>*/}
                {/*<Input type={this.props.type !== '' ? this.props.type : 'text'}*/}
                       {/*placeholder={this.props.placeholder}*/}
                       {/*ref="textInput"*/}
                       {/*onChange={this.handleChange}*/}
                       {/*value={value}/>*/}
                {/*<FieldGroup*/}
                    {/*id="formControlsText"*/}
                    {/*type="text"*/}
                    {/*label="Text"*/}
                    {/*placeholder="Enter text"*/}
                {/*/>*/}
                <FormControl type={this.props.type !== '' ? this.props.type : 'text'}
                             placeholder={this.props.placeholder}
                             onChange={this.handleChange}
                             value={value}
                />
            </div>
        );
    }
}

export default TextInput;


