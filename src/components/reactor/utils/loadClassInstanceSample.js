import {gatherInstanceSamples} from "../../../actions/resources";

/**
 * gathers a sample of instances for the class identified by the given IRI.
 *
 * The sample is only fetched, if it has not been tried before.
 *
 * @param id of the fetching request (which can be used to find the result in the state).
 * @param iri of the class for which an instance sample shall be fetched.
 * @param role active role.
 * @param values for the class identified by the given IRI.
 * @param config configuration for fetching the neighbourhood.
 * @param dispatch redux dispatch function for executing actions.
 */
export default ({id, iri, role, values, config, dispatch}) => {
    if (!values || !values['instance_sample'] || !values['instance_sample'][id] || !values['instance_sample'][id].status) {
        if (config && config.number) {
            dispatch(gatherInstanceSamples({iri, role, id, config}));
        }
    }
}