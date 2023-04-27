import {fetchNeighbourhood} from "../../../actions/resources";

/**
 * fetches the neighbourhood for a given IRI considering the current role
 * and neighbourhood configuration.
 *
 * The neighbourhood is only fetched, if it has not been tried before.
 *
 * @param id of the fetching request (which can be used to find the result in the state)
 * @param iri for which the neighbourhood shall be fetched.
 * @param role active role.
 * @param values for the resource identified by the given IRI.
 * @param config configuration for fetching the neighbourhood.
 * @param dispatch redux dispatch function for executing actions.
 */
export default ({id, iri, role, values, config, dispatch}) => {
    if (!values || !values.neighbourhood || !values.neighbourhood[id] || !values.neighbourhood[id].status) {
        if (config && config.neighbourhood) {
            dispatch(fetchNeighbourhood({
                iri, role, config: {
                    includedProperties: config.neighbourhood.include,
                    excludedProperties: config.neighbourhood.exclude,
                    provenance: config.provenance,
                }, id
            }))
        }
    }
}