import React from 'react';
import NotificationListBase from '../base/NotificationListBase';

class NotificationList extends NotificationListBase {
    render(){
        const notifications = this.props.notifications.map((notification) => {
            return (
                <div>
                    <img src={notification.image}/>
                    <p id="sitterName">{notification.name}</p>
                    <p id="notificationText">{notification.notificationText}</p>
                    <p id="notificationTime">{notification.notificationTime}</p>
                </div>
            )});

        return(
            {notifications}
        )
    }
}

export default NotificationList;
