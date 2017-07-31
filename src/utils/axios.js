import axios from 'axios';
import strings from '../static/strings';

export function getUser(userId, callback){
    axios({
        method: 'post',
        url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + 'user/getUser',
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        data: {_id: userId}
    })
        .then(function (response) {
            if(response.data)
                callback(response);
            else return callback({})
        })
        .catch(function (error) {
            return callback(error);
        });
}

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
