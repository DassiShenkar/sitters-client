export function changeWorkingHours(workingHours, day) {
    return {
        type: 'CHANGE_WORKING_HOUR_DAY',
        workingHours,
        day
    }
}
