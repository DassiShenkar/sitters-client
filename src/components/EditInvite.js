import React from 'react';

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
            <form id="invite" onSubmit={this.sendInvite}>
                <input type="submit" className="send-invite" value="Send"/>
            </form>
        );
    };
}

export default Form;