//external sources
import React from 'react';
import moment from 'moment';

//components
import BigCalendar from 'react-big-calendar';

//utils
import {post} from '../../../../../utils/serverCalls';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

//init
BigCalendar.momentLocalizer(moment);

export default class SitterFeedBase extends React.Component {
    componentWillMount() {
        let self = this;
        const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (userId) {
            post(sittersApi.GET_SITTER, {_id: userId}, function(sitter){
                if (sitter.data)   // user exists
                    self.props.actions.actionCreators.setSitterData(sitter.data);
                else // user not exist
                    self.props.router.push('/login');
            });
        }
    }
}