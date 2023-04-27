const storageSupported = typeof (Storage) !== "undefined";

/**
 * persists the given state under the given id and overrides
 * data that might have been previously persisted under the
 * same id.
 *
 * @param id for which the given state shall be persisted.
 * @param state which shall be persisted.
 */
export function persistState(id, state) {
    if (storageSupported) {
        localStorage.setItem(id, JSON.stringify(state));
    }
}

/**
 * fetches the state for the given id. Should there be
 * no state stored under the given id, then an empty
 * object is returned.
 *
 * @param id for which the state shall be fetched.
 */
export function getState(id) {
    if (storageSupported) {
        const state = localStorage.getItem(id);
        if (state) {
            return JSON.parse(state);
        }
    }
    return {};
}
