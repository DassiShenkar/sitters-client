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
        let hourFee = this.props.user.hourFee;
        this.props.user.invites.forEach(function(invite){
            let startTime = new Date(invite.startTime);
            let endTime = new Date(invite.endTime);
            let timeDifference = (((endTime - startTime) % 86400000) / 3600000).toFixed(2);

            events.push({
                title: 'Watch ' + invite.childName + "  - " + (timeDifference * hourFee) + "$",
                // allDay: true,
                startDate: new Date(invite.startTime),
                endDate: new Date(invite.endTime)
            })
        });
        return (
            <div id="sitter-feed">
                {/*<InviteList isParent={this.props.user.isParent} invites={this.props.user.invites}/>*/}
                <BigCalendar
                    events={events}
                    defaultDate={new Date()}
                    startAccessor='startDate'
                    endAccessor='endDate'
                />
                <InvitesModal {...this.props} />
            </div>
        );
    }
}

export default SitterFeed;
