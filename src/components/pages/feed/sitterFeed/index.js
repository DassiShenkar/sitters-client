//external sources
import React from 'react';
import moment from 'moment';

//components
import SitterFeedBase from "../../../base/pages/feed/sitterFeed/index";
import BigCalendar from 'react-big-calendar';
import InvitesModal from "../../../modals/invites/index";
import {PageHeader} from "react-bootstrap";

//statics
import strings from "../../../../static/strings";

//style
import 'react-big-calendar/lib/css/react-big-calendar.css'

//init
BigCalendar.momentLocalizer(moment);

export default class SitterFeed extends SitterFeedBase {
    render() {
        const events = [];
        const self = this;
        let hourFee = this.props.user.hourFee;
        let monthlyMoney = 0;
        let calenderMonth = moment(this.props.sitterFeed.calenderDate);
        this.props.user.invites.forEach(function (invite) {
            if (invite.status === "accepted") {
                let startTime = new Date(invite.date + " " + invite.startTime);
                let endTime = new Date(invite.date + " " + invite.endTime);
                let timeDifference = (((endTime - startTime) % 86400000) / 3600000).toFixed(2);
                const numberOfInvites = self.props.user.multipleInvites.filter(function (object) {
                    return object._id === invite.parentID;
                });
                const title = 'Watch ' + invite.childName + "(" + numberOfInvites[0].count + ") - " + Math.round(timeDifference * hourFee) + "$";

                let inviteDate = moment(invite.date, 'MM/DD/YYYY');
                if(inviteDate.format("M") === calenderMonth.format("M")){
                    monthlyMoney += Math.round(timeDifference * hourFee);
                }
                events.push({
                    title: title,
                    // allDay: true,
                    startDate: startTime,
                    endDate: endTime,
                    id: invite._id
                });
            }
        });
        const url = strings.DEBUG? strings.CLIENT: strings.WEBSITE;
        return (
            <div id="sitter-feed" className="page">
                <PageHeader>Work Scheduale</PageHeader>
                <BigCalendar
                    events={events}
                    defaultDate={new Date()}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    onSelectEvent={event => this.props.router.push(url + 'invite/' + event.id)}
                    onNavigate={(date) => this.props.actions.sitterFeedActions.changeCalenderDate(date)}
                />
                {monthlyMoney !== 0? <h1>You are going to earn  {monthlyMoney}$ in {calenderMonth.format('MMMM')}</h1>: ""}
                <InvitesModal {...this.props} />
            </div>
        );
    }
}