export function getUserFromDb(userId) {
    axios({
        method: 'post',
        // url: 'https://sitters-server.herokuapp.com/parent/get',
        url: 'https://sittersdev.herokuapp.com/parent/get',
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        data: {_id: userId.toString()}
    }).then(function (res) {
        if (res.data) {  // user exists
            return res.data;
        } else { // user not exist
            return {error: 'user not found'};
        }
    }).catch(function (error) {
        return error;
    });
}
