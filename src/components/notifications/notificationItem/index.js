// external sources
import React from 'react';

// components
import {Image} from 'react-bootstrap';

// style
import './style.css';

class NotificationItem extends React.Component {
    render() {
        const notification = this.props.notification;
        return (
            <li className="notification-item">
                <div className="notification-info">
                    <Image src={notification.sitterImage} alt={notification.sitterName} circle/>
                    <div>
                        <h4>{notification.sitterName}</h4>
                        <p>{notification.date}</p>
                    </div>
                </div>
            </li>
        )

    }
}

export default NotificationItem;