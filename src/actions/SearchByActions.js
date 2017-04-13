export function chngeRange(priceMinRange,priceMaxRange) {
    return {
        type: 'CHANGE_RANGE',
        priceMinRange,
        priceMaxRange
    }
}