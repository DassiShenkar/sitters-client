import React from 'react';
import CheckBoxInput from "../checkbox/index";
class WorkingHours extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.day}</h4>
               <CheckBoxInput types={this.props.types} action={this.props.action} day={this.props.day}/>
            </div>
        )
    }
}
export default WorkingHours;