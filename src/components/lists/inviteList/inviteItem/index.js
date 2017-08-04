// external sources
import React from 'react';
import dateFormat from 'dateformat';
import {Link} from "react-router";

// components
import {Image} from 'react-bootstrap';

// style
import './style.css';

export default class InviteItem extends React.Component {
    render() {
        const invite = this.props.invite;
        return (
            <Link className="invite-link"
                  to={'/invite/' + invite._id}>
                <li className="invite-item">
                    <div className="invite-info">
                        <Image src={this.props.isParent? invite.sitterImage: invite.parentImage} alt={this.props.isParent? invite.sitterName: invite.parentName} circle/>
                        <div>
                            <h4>{this.props.isParent? invite.sitterName: invite.parentName}</h4>
                            <p>{invite.date + ' ' + dateFormat(invite.startTime, "HH:mm") + '-' + dateFormat(invite.endTime, "HH:mm")}</p>
                        </div>
                    </div>
                    <p className="invite-status">{'Status: ' + invite.status}</p>
                </li>
            </Link>
        )
    }
}