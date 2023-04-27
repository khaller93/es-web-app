/* construct a deep change to the similarity information */
const getWithId = (state, role, id) => {
  const newState = { ...state };
  newState.perspective = { ...newState.perspective };
  newState.perspective[role] = { ...newState.perspective[role] };
  const obj = { ...newState.perspective[role][id] };
  newState.perspective[role][id] = obj;
  return [newState, obj];
};

/* helper function for creating status objects */
const statusObject = (status) => ({ status, timestamp: Date.now() });

const facetReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ENABLE_FACET_PREDICATE':
      if (action.payload.predicate) {
        const enableMap = { ...state.enabled };
        enableMap[action.payload.predicate.id] = !!action.payload.enable;
        return { ...state, enabled: enableMap };
      }
      return state;
    case 'FETCH_FACET_DETAILS_PENDING':
      if (action.payload.id && action.payload.predicateList) {
        const [detailsObj, valueObj] = getWithId(state.details ? state.details : {}, '_',
          action.payload.id);
        for (let i = 0; i < action.payload.predicateList.length; i++) {
          const cp = action.payload.predicateList[i];
          valueObj[cp.id] = statusObject('fetching');
        }
        return { ...state, details: detailsObj };
      }
      return state;
    case 'FETCH_FACET_DETAILS_REJECTED':
      if (action.payload.id && action.payload.predicateList) {
        const [detailsObj, valueObj] = getWithId(state.details ? state.details : {}, '_',
          action.payload.id);
        for (let i = 0; i < action.payload.predicateList.length; i++) {
          const cp = action.payload.predicateList[i];
          valueObj[cp.id] = statusObject('failed');
        }
        return { ...state, details: detailsObj };
      }
      return state;
    case 'FETCH_FACET_DETAILS_FULFILLED':
      if (action.payload.id && action.payload.predicateList && action.payload.values) {
        const [detailsObj, valueObj] = getWithId(state.details ? state.details : {}, '_',
          action.payload.id);
        for (let i = 0; i < action.payload.predicateList.length; i++) {
          const cp = action.payload.predicateList[i];
          if (action.payload.values[cp.id]) {
            valueObj[cp.id] = { ...statusObject('loaded'), list: action.payload.values[cp.id] };
          }
        }
        return { ...state, details: detailsObj };
      }
      return state;
    case 'CHANGE_FACET_SELECTION':
      if (action.payload.id && action.payload.predicate && action.payload.selectionFunction) {
        const [detailsObj, valueObj] = getWithId(state.details ? state.details : {}, '_',
          action.payload.id);
        action.payload.selectionFunction(valueObj[action.payload.predicate.id]);
        return { ...state, details: detailsObj };
      }
      return state;
    case 'DELETE_FACET_SELECTION':
      if (action.payload.id && action.payload.predicate) {
        const [detailsObj, valueObj] = getWithId(state.details ? state.details : {}, '_',
          action.payload.id);
        valueObj[action.payload.predicate.id] = {
          ...valueObj[action.payload.predicate.id],
          selection: undefined,
        };
        return { ...state, details: detailsObj };
      }
      return state;
    default:
      return state;
  }
};

facetReducer.id = 'facet';

export default facetReducer;
