import axios from 'axios';
import strings from '../static/strings';

export function request(method, endpoint, data, callback) {
    axios({
        method: method,
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
