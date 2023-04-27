import axios from "axios";
import {prepareDescriptionStep} from "./services/assembler/description";
import {getAllStep, getSingleStep} from "./services/assembler/acquisition";
import {prepareNeighbourhoodFlow, prepareSimilarityFlow} from "./services/assembler/exploration";
import {
    extractDescription,
    extractNeighbourhoodFromResource,
    getClassInformation,
    getSimilarityEntries
} from "./services/esm/utils";
import {getServer} from "../configuration";

const server = getServer();

/**
 * gathers the description for the given IRI considering the current role and the description configuration
 * for this role.
 *
 * @param iri for which the description shall be fetched.
 * @param role under which the resource description shall be fetched.
 * @param descriptionConfig the configuration for the description considering the given role.
 * @param supportedLanguages languages that are supported in this app and shall be fetched.
 * @return {Function} action payload
 */
export function gatherResourceDescription({iri, role, descriptionConfig, supportedLanguages}) {
    const steps = [getSingleStep({iri}), prepareDescriptionStep(descriptionConfig, supportedLanguages)];
    return dispatch => {
        dispatch({
            type: 'DESCRIBE_SINGLE_RESOURCE_PENDING',
            payload: {iri, role},
        });
        axios.post(server.explorationFlowEndPoint, {steps: steps})
            .then(response => {
                dispatch({
                    type: 'DESCRIBE_SINGLE_RESOURCE_FULFILLED',
                    payload: {
                        iri,
                        role,
                        description: response.data && response.data.values && response.data.values[iri] ? extractDescription(response.data.values[iri].describe) : null
                    },
                });
            })
            .catch(error => {
                dispatch({
                    type: 'DESCRIBE_SINGLE_RESOURCE_REJECTED',
                    payload: {iri, role, error},
                });
            });
    };
}

/**
 * gathers the class information for a given resource.
 *
 * @param iri of the resource for which the class information shall be fetched.
 * @returns {Function} action payload
 */
export function gatherClassInformation({iri}) {
    const steps = [getSingleStep({iri}), {name: 'esm.exploit.class.info'}];
    return dispatch => {
        dispatch({
            type: 'FETCHING_CLASS_INFO_PENDING',
            payload: {iri}
        });
        axios.post(server.explorationFlowEndPoint, {steps: steps}).then(response => {
            dispatch({
                type: 'ADD_CLASS_INFO',
                payload: {
                    list: getClassInformation(response && response.data ? response.data.list : null,
                        response && response.data ? response.data.values : null),
                }
            });
        }).catch(error => {
            dispatch({
                type: 'FETCHING_CLASS_INFO_FAILED',
                payload: {iri}
            });
        });
    }
}

/**
 * gathers a sample of given size for the class identified by the given IRI.
 *
 * @param iri of the class resource for which the sample shall be taken.
 * @param role under which the class samples shall be fetched.
 * @param id unique identifier for the request.
 * @param number specifies the number of instances in the sample. per default its 4.
 */
export function gatherInstanceSamples({iri, role, id, config: {number = 4}}) {
    const steps = [getAllStep({includedClasses: [iri]}), {name: 'esm.aggregate.sample', param: {number: number}}];
    return dispatch => {
        dispatch({
            type: 'FETCH_INSTANCE_SAMPLES_PENDING',
            payload: {iri, role, id,}
        });
        axios.post(server.explorationFlowEndPoint, {steps: steps}).then(response => {
            dispatch({
                type: 'FETCH_INSTANCE_SAMPLES_FULFILLED',
                payload: {
                    iri, role, id,
                    list: response.data ? response.data.list : null,
                }
            });
        }).catch(error => {
            dispatch({
                type: 'FETCH_INSTANCE_SAMPLES_FAILED',
                payload: {iri, role, id,}
            });
        });
    };
}

/**
 * fetches similar entities for the given resource, considering the given arguments.
 *
 * @param iri for which similar entities shall be fetched.
 * @param role under which similar entities shall be requested.
 * @param id unique identifier for the request.
 * @param ranking configuration for the assessment of similar entities.
 * @param classes only considers instances of the specified classes, or all, if none is specified.
 * @param excludedClasses classes of which their instances shall be ignored.
 * @param number specifies the number of similar entities that shall be fetched. 4 per default.
 * @returns {Function} action payload
 */
export function fetchSimilarResources({iri, role, id, config: {ranking, classes = null, excludedClasses = null, number = 4}}) {
    const steps = prepareSimilarityFlow({iri, config: {ranking, classes, excludedClasses, number}});
    return dispatch => {
        dispatch({type: 'FETCH_SIM_PENDING', payload: {iri, role, id}});
        axios.post(server.explorationFlowEndPoint, {steps})
            .then(response => {
                dispatch({
                    type: 'FETCH_SIM_FULFILLED',
                    payload: {
                        iri, role, id,
                        data: response.data ? getSimilarityEntries(response.data) : null,
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_SIM_REJECTED', payload: {iri, role, id, error: error}
                });
            });
    }
}

/**
 * fetches the neighbourhood for the given IRI considering the active role and configuration for the
 * neighbourhood request.
 *
 * @param id ID of fetch request.
 * @param iri for which the neighbourhood shall be checked.
 * @param role active role.
 * @param config configuration for fetching the neighbourhood.
 * @return {Function}
 */
export function fetchNeighbourhood({id, iri, role, config}) {
    const steps = prepareNeighbourhoodFlow({iri, config});
    return dispatch => {
        dispatch({type: 'FETCH_NEIGHBOURHOOD_PENDING', payload: {id, iri, role}});
        axios.post(server.explorationFlowEndPoint, {steps}).then(response => {
            dispatch({
                type: 'FETCH_NEIGHBOURHOOD_FULFILLED',
                payload: {
                    id, iri, role,
                    resp: response.data,
                    data: response.data ? extractNeighbourhoodFromResource(iri, response.data.neighbourhood, response.data.values) : null
                }
            });
        }).catch(error => {
            dispatch({type: 'FETCH_NEIGHBOURHOOD_REJECTED', payload: {id, iri, role, error: error}});
        });
    };
}