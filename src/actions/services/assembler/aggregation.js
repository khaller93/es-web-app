/**
 * assembles a limit step with the given number.
 *
 * @param limit number to which the resource list shall be restricted.
 * @return {{}} limit step with the given number.
 */
export function getLimitStep(limit) {
    return {
        name: 'esm.aggregate.limit',
        param: {number: limit}
    };
}

/**
 * assembles an offset step with the given number.
 *
 * @param offset number which shall be skipped in the resource list.
 * @return {{}} offset step with the given number.
 */
export function getOffsetStep(offset) {
    return {
        name: 'esm.aggregate.offset',
        param: {number: offset}
    };
}