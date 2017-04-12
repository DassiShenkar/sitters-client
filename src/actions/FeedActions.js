import axios from 'axios';

export function getMatches(parent) {
    axios.post('https://sitters-server.herokuapp.com/parent/getMatches', {
        parent: parent
    })
        .then(function (res) {
            const sitters = res.data;
            if (sitters) {  // has matches
                return {
                    type: 'GET_MATCHES',
                    sitters
                }
            }
            else { // no matches
                console.log("no matches found");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function changeInviteFromTime(fromTime) {
    return {
        type: 'CHANGE_INVITE_FROM_TIME',
        fromTime
    }
}

export function changeInviteToTime(toTime) {
    return {
        type: 'CHANGE_INVITE_TO_TIME',
        toTime
    }
}

export function changeInviteDate(inviteDate,inviteDay,isoValue) {
    return {
        type: 'CHANGE_INVITE_DATE',
        inviteDate,
        inviteDay,
        isoValue
    }
}
