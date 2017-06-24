//external sources
import React from 'react';
import axios from 'axios';
import InviteList from '../../../inviteList'
import strings from "../../../../static/strings";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//components

//style
import 'react-big-calendar/lib/css/react-big-calendar.css'
import InvitesModal from "../../../inviteList/inviteModal/index";
import {PageHeader} from "react-bootstrap";

// BigCalendar.setLocalizer(
//     BigCalendar.momentLocalizer(moment)
// );

BigCalendar.momentLocalizer(moment);
class SitterFeed extends React.Component {
    componentWillMount() {
        let self = this;
        const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (!userId) {
        } else {
            axios({
                method: 'post',
                url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'sitter/get',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                data: {_id: userId}
            })
                .then(function (sitter) {
                    if (sitter.data) {  // user exists
                        self.props.actions.settingsActions.setNotifications(sitter.data.settings.allowNotification);
                        self.props.actions.settingsActions.setSuggestions(sitter.data.settings.allowSuggestions);
                        self.props.actions.settingsActions.setShowOnSearch(sitter.data.settings.allowShowOnSearch);
                        self.props.actions.actionCreators.setSitterData(sitter.data);
                    }
                    else { // user not exist
                        self.props.router.push('/login');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        const events = [];
        const self = this;
        let hourFee = this.props.user.hourFee;
        this.props.user.invites.forEach(function (invite) {
            if (invite.status === "accepted") {
                let startTime = new Date(invite.date + " " + invite.startTime);
                let endTime = new Date(invite.date + " " + invite.endTime);
                let timeDifference = (((endTime - startTime) % 86400000) / 3600000).toFixed(2);
                const numberOfInvites = self.props.user.multipleInvites.filter(function (object) {
                    return object._id === invite.parentID;
                });
                console.log(numberOfInvites[0].count);
                const title = 'Watch ' + invite.childName + "(" + numberOfInvites[0].count + ") - " + Math.round(timeDifference * hourFee) + "$";

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
                />
                <InvitesModal {...this.props} />
            </div>
        );
    }
}

export default SitterFeed;
