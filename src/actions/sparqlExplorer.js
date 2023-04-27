/**
 *
 *
 * @param payload
 * @return {{payload: *, type: string}}
 */
export function updateSPARQLEditor(payload) {
    return {
        type: 'UPDATE_SPARQL_EDITOR',
        payload: payload
    }
}