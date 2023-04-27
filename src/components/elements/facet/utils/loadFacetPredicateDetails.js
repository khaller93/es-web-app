import {getFacetDetails} from "../../../../actions/services/esm/facet";
import {getAllStep} from "../../../../actions/services/assembler/acquisition";

/**
 *
 * @param explorationState
 * @param role
 * @param details
 * @param predicateList
 * @param dispatch
 */
export default ({explorationState, role, details, predicateList, dispatch}) => {
    let id = 'all';
    let origin = getAllStep({});
    if (explorationState && explorationState.id) {
        id = explorationState.id;
    }
    // specify predicate list
    const pList = [...predicateList.filter(p => !(details && details[id] &&
        details[id][p.id] && details[id][p.id].status))];
    if (pList && pList.length > 0) {
        dispatch(getFacetDetails({
            id: id,
            origin: origin,
            role,
            predicateList: pList,
        }));
    }
}