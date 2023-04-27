import {gatherResourceDescription} from "../../../actions/resources";


/**
 * checks whether the description has been gathered previously, and if
 * it is not the case, then the description is gathered.
 *
 * @param role active role.
 * @param iri for which description shall be gathered.
 * @param values of the resource with the given IRI.
 * @param descriptionConfig
 * @param supportedLanguages
 * @param dispatch redux dispatch function for executing actions.
 */
export default ({role, iri, values, descriptionConfig, supportedLanguages, dispatch}) => {
    if (!values || !('description' in values) || !values.description.status) {
        dispatch(gatherResourceDescription({iri, role, descriptionConfig, supportedLanguages}));
    }
}