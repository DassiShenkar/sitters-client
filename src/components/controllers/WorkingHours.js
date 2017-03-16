import React from 'react';
import WorkingHoursBase from '../../base/controllers/WorkingHoursBase';
class WorkingHours extends WorkingHoursBase {// need to get default and types
    constructor(props) {
        super(props);
    }
    render() {
        const days = this.props.days.map((day) => {
            return (
                <li>
                    <label key={this.props.days.indexOf(day)}>
                        {day + ' '}
                        From
                        <input id="day" type="time" value="18:00" />
                        To
                        <input id="day" type="time" value="22:00" />
                    </label>
                </li>
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