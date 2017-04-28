// external sources
import React from 'react';
import {Link} from 'react-router';

// components
import {Image} from 'react-bootstrap';

// style
import './style.css';

class InviteItem extends React.Component {
    render() {
        const invite = this.props.invite;
        return (
            <li className="invite-item">
                {/*<Link to={`/invite/${invite.id}`}>*/}
                <div className="invite-info">
                    <Image src={invite.sitterImage} alt={invite.sitterName} circle/>
                    <div>
                        <h4>{invite.sitterName}</h4>
                        <p>{invite.date + ' ' + invite.startTime + '-' + invite.endTime}</p>
                    </div>
                </div>
                <p className="invite-status">{'Status: ' + invite.status}</p>
                {/*</Link>*/}
            </li>
        )

    }
}

export default InviteItem;