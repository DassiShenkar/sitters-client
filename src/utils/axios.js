import axios from 'axios';
import strings from '../static/strings';

export function updateMutualFriends(user, path){
    axios({
        method: 'post',
        url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + path,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        data: user
    })
        .then(function (response) {
            console.log('updated mutual friends')
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function updateInvite(user, invite, action, callback) {
    axios({
        method: 'post',
        url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'invite/updateInvite',
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        data: {'invite': invite, action: action, isParent: user.isParent}
    }).then(function (res) {
        callback(res);
    })
        .catch(function (error) {
            alert(error);
            //TODO: think about error
        });
}