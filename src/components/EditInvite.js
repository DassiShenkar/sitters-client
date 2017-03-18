import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.sendInvite = this.sendInvite.bind(this);

        this.state = {
            sitterProfilePicture: 'sitterPic',
            sitterName: 'sitterName',
            date: 'inviteDate',
            time: 'inviteTime',
            location: 'inviteLocation',
            notes: 'notes'
        }
    };


    sendInvite(e) {
        console.log('send!');
    };


    render() {
        return (
            <form id="invite">
                <Button bsStyle="primary" onClick={this.sendInvite}>Send Invite</Button>
            </form>
        );
    };
}

export default Form;