import React from 'react';
import TextInputBase from './TextInputBase.js'
import {RadioGroup, Radio} from 'react-radio-group';
class RadioInputBase extends TextInputBase {

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setState({value: ''});
    };

    getValue() {
        return this.state.value;
    }


    handleChange(value) {
        this.setState({value: value});
    }


    render() {
        // let label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
        // let type = this.props.type !== '' ?  this.props.type: 'text';
        // let placeholder = this.props.placeholder !== ''? this.props.placeholder : '';
        // let labels = '';
        // if(this.props.names.length != 0){
        //     this.props.names.forEach(function(name) {
        //         labels += '<label>{name.name</label>';
        //         labels += '<input value='''
        //     }
        // }

        // var createItem = function (radioText) {
        //     let l
        //     return <label>{radioText}</label>;
        // }
        var createItem = function (radioInput) {
            //return <label><Radio value={radioInput.toLowerCase()}/>{radioInput}</label>;
            return <input id={radioInput} value={radioInput} type="radio" checked={this.state.value === {radioInput}}
                          name="gender-radio" onChange={this.handleChange(radioInput)}/>;
        };
        return (
                <div>
                    {this.props.radioInputs.map(createItem)}
                </div>


            // <div>
            //
            //
            // <div className="text-input">
            //     {label}
            //     <input type={type} id="textInput" placeholder={placeholder} ref="textInput" onChange={this.handleChange} />
            //
            //
            //
            //
            //
            //     <li className="user-option">
            //         <label htmlFor="male">Male</label>
            //         <input id="male" value="male" type="radio" checked={this.state.genderFilter === "male"}
            //                name="gender-radio" onChange={this.onChangeGender.bind(this, "male")}/>
            //     </li>
            //     <li className="user-option">
            //         <label htmlFor="female">Female</label>
            //         <input id="female" value="female" type="radio"
            //                checked={this.state.genderFilter === "female"} name="gender-radio"
            //                onChange={this.onChangeGender.bind(this, "female")}/>
            //     </li>
            // </div>
        )
    }
}


// RadioInputBase.propTypes = {
//     label: React.PropTypes.string
// };
//
// RadioInputBase.defaultProps = {
//     label: 'label',
// };

export default RadioInputBase;


