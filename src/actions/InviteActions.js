export function sendInvite(date, time, location, comments) {
    return {
        type: 'ADD_INVITE',
        date,
        time,
        location,
        comments
    }
}

export function updateDate(date) {
    return {
        type: 'UPDATE_DATE',
        date
    }
}



