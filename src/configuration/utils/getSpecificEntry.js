/**
 * gets the specific entry in the given map configuration. This
 * method never returns null or undefined, but potentially an
 * empty object signaling a missing configuration entry.
 *
 * @param map configuration map.
 * @param variable of interest (e.g. perspective, type, ...)
 * @param argument optional argument, which will be substituted with
 * '_' if not given.
 */
export default function getSpecificEntry(map, variable, argument) {
    if (map && variable && map[variable]) {
        if (argument === undefined || argument === null || argument === '_') {
            return map[variable]['_'];
        } else if (!(argument in map[variable])) {
            return map[variable]['_'];
        } else {
            return Object.assign({}, map[variable]['_'], map[variable][argument]);
        }
    }
    return {};
}