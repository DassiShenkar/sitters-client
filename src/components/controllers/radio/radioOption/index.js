//external sources
import React from 'react';

//style
import './style.css';

export default class RadioOption extends React.Component {
    render() {
        return (
            <div className="radio-option" >
                <label>
                    <input type="radio"
                           name={this.props.radioType}
                           value={this.props.option}
                           checked={this.props.defaultValue === this.props.option}
                           onChange={this.handleRadio}
                           required={this.props.required}/>
                    <span className={this.props.defaultValue === this.props.option ? "icon-dot-circle-o" : "icon-circle-o"}/>{this.props.option}</label>
            </div>
        )
    }
}