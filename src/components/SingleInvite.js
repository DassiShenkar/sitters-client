import React from 'react';

class SingleInvite extends React.Component{
    render() {
        const inviteId = this.props.params.inviteId;
        const invite = this.props.user.invites.filter((invite) => invite.id === inviteId)[0];
        return (
            <form className="single-invite">
                <img src={invite.sitterImage} alt={invite.sitterName}/>
                <p>{invite.sitterName}</p>
                <p>{'Date: ' + invite.date}</p>
                <p>{'Location: ' + invite.location}</p>
                <p>{'Time: ' + invite.startTime + '-' + invite.endTime}</p>
                <p>{'Notes: ' + invite.notes}</p>
                <p>{'Status: ' + invite.status}</p>
            </form>
        )
    }
}

export default SingleInvite;
