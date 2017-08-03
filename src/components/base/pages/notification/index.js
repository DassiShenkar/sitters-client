//external sources
import React from 'react';

//utils
import {post} from '../../../../utils/serverCalls';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";
import * as _ from "lodash";

export default class NotificationBase extends React.Component {

    componentWillMount() {
        const notificationId = this.props.router.params.notificationId;
        let user = this.props.user;
        let shouldUpdate = true;
        user.notifications.forEach(function (notification) {
            if (notification._id === notificationId) {
                if (notification.wasRead)
                    shouldUpdate = false;
                notification.wasRead = true;
            }
        });
        if (shouldUpdate)
            post(this.props.user.isParent? sittersApi.UPDATE_PARENT: sittersApi.UPDATE_SITTER, user, _.noop);
    }
}
