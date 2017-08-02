import axios from 'axios';
import strings from '../static/strings';

export function post(endpoint, data, callback) {
    axios({
        method: 'post',
        url: (strings.DEBUG ? strings.LOCALHOST : strings.WEBSITE ) + endpoint,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        data: data
    })
        .then(function (response) {
            if (response.data)
                callback(response);
            else return callback({})
        })
        .catch(function (error) {
            return callback(error);
        });
}
