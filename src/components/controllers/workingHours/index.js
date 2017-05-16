import React from 'react';
import Day from "./Day";
class WorkingHours extends React.Component {

    render() {
        const days = this.props.days.map((day) => {
            return (
              <Day key={this.props.days.indexOf(day)} day={day} types={this.props.hours} action={this.props.action}/>
            )
        });
        return (
            <div>
                <ul>
                    {days}
                </ul>
            </div>
        )
    }
}
export default WorkingHours;