import axios from "axios";
import {getServer} from "../../../configuration";
import {prepareFacetDetails} from "../assembler/facet";
import {getFacetDetailValues} from "./utils";

const server = getServer();

export function getFacetDetails({id, role, origin, predicateList}) {
    return dispatch => {
        dispatch({
            type: 'FETCH_FACET_DETAILS_PENDING',
            payload: {
                id: id,
                role: role,
                predicateList: predicateList,
            }
        });
        axios.post(server.explorationFlowEndPoint, {
            steps: prepareFacetDetails({predicateList, origin}),
        }).then(response => {
            dispatch({
                type: 'FETCH_FACET_DETAILS_FULFILLED',
                payload: {
                    id: id,
                    role: role,
                    predicateList: predicateList,
                    values: getFacetDetailValues(predicateList, response.data)
                }
            });
        }).catch(error => {
            dispatch({
                type: 'FETCH_FACET_DETAILS_REJECTED',
                payload: {
                    id: id,
                    role: role,
                    predicateList: predicateList,
                }
            });
        })
    };
}