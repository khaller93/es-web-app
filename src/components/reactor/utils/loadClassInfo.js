import {gatherClassInformation} from "../../../actions/resources";

/**
 * checks whether the class info has been gathered previously, and if
 * it is not the case, then the class info is gathered.
 *
 * @param iri for which class information shall be gathered.
 * @param values of the resource with the given IRI.
 * @param dispatch redux dispatch function for executing actions.
 */
export default ({iri, values, dispatch}) => {
    if (!values || !('classInfo' in values) || !values.classInfo.status) {
        dispatch(gatherClassInformation({iri}));
    }
}