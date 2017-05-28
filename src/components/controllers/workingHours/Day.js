import React from 'react';
import CheckBoxInput from "../checkbox/index";
import {ControlLabel} from "react-bootstrap";
class WorkingHours extends React.Component {
    render() {
        return (
            <div>
                <ControlLabel>{this.props.day}</ControlLabel>
               <CheckBoxInput types={this.props.types} action={this.props.action} day={this.props.day}/>
            </div>
        )
    }
}
export default WorkingHours;