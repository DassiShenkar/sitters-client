import React from 'react';
import WorkingHoursBase from '../../base/controllers/WorkingHoursBase';
class WorkingHours extends WorkingHoursBase {

    render() {
        const days = this.props.days.map((day) => {
            return (
                <li key={day}>
                    <label key={this.props.days.indexOf(day)}>
                        {day + ' '}
                        From
                        <input id="day" type="time" defaultValue="18:00"/>
                        To
                        <input id="day" type="time" defaultValue="22:00"/>
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