import React from 'react';
import {Link} from 'react-router';

class InviteItem extends React.Component {
    render() {
        const invite = this.props.invite;
        return (
            <Link to={`/invite/${invite.id}`}>
                <img src={invite.sitterImage} alt={invite.sitterName}/>
                <strong>{invite.sitterName}</strong>
                <p>{invite.status}</p>
            </Link>
        )

    }
}

export default InviteItem;