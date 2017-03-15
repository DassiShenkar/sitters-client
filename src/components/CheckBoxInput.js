import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
class CheckBoxInput extends React.Component {// need to get default and types
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(newValue){
        this.setState({checked: newValue});
        console.log(newValue);
    }
    getValue(){
        return this.state.checked;
    }
    render() {
        const options = this.props.types.map((name) => {
            return (
                <label><Checkbox value={name}/> {name}</label>
            )
        });
        return (
            <div>

                <CheckboxGroup name={this.props.name} value="" onChange={this.onChange} children='' >
                    {options}
                </CheckboxGroup>
            </div>
        )
    }
}
export default CheckBoxInput;