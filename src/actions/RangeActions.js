export function changeRange(priceMinRange,priceMaxRange) {
    return {
        type: 'CHANGE_RANGE',
        priceMinRange,
        priceMaxRange
    }
}