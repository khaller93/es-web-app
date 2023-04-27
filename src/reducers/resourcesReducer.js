/* construct a deep change to the 'variable' information */
const get = (state, iri, role, variable, obj) => {
  const addition = { ...state[iri] };
  addition.perspective = { ...addition.perspective };
  addition.perspective[role] = { ...addition.perspective[role] };
  addition.perspective[role][variable] = obj;
  const newState = {};
  newState[iri] = addition;
  return newState;
};

/* construct a deep change to the similarity information */
const getWithId = (state, iri, role, variable, id, obj) => {
  const addition = { ...state[iri] };
  addition.perspective = { ...addition.perspective };
  addition.perspective[role] = { ...addition.perspective[role] };
  addition.perspective[role][variable] = { ...addition.perspective[role][variable] };
  addition.perspective[role][variable][id] = obj;
  const newState = {};
  newState[iri] = addition;
  return newState;
};

/* helper function for creating status objects */
const statusVObject = (status) => ({ status: { value: status, timestamp: Date.now() } });

/* helper function for creating description objects */
const description = (descriptionObj) => {
  const description = statusVObject('loaded');
  if (descriptionObj && descriptionObj.label) {
    description.label = descriptionObj.label;
  }
  if (descriptionObj && descriptionObj.description) {
    description.description = descriptionObj.description;
  }
  if (descriptionObj && descriptionObj.depiction) {
    description.depiction = descriptionObj.depiction;
  }
  return description;
};

/**
 * This reducer handles all actions for the explorer page.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const resourcesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DESCRIBE_SINGLE_RESOURCE_PENDING':
      if (action.payload && action.payload.iri && action.payload.role) {
        return {
          ...state,
          ...get(state,
            action.payload.iri,
            action.payload.role,
            'description',
            statusVObject('loading')),
        };
      }
      return state;
    case 'DESCRIBE_SINGLE_RESOURCE_REJECTED':
      if (action.payload && action.payload.iri) {
        return {
          ...state,
          ...get(state,
            action.payload.iri,
            action.payload.role,
            'description',
            statusVObject('error')),
        };
      }
      return state;
    case 'DESCRIBE_SINGLE_RESOURCE_FULFILLED':
      if (action.payload && action.payload.iri) {
        return {
          ...state,
          ...get(state,
            action.payload.iri,
            action.payload.role,
            'description',
            description(action.payload.description)),
        };
      }
      return state;
    case 'EXPLORE_SEARCH_FULFILLED':
      if (action.payload.response && action.payload.response.data && action.payload.response.data.list) {
        const newStates = [];
        const resources = action.payload.response.data.list;
        for (let i = 0; i < resources.length; i++) {
          newStates.push(get(state,
            resources[i],
            action.payload.searchState.role,
            'description',
            statusVObject('loaded')));
        }
        return Object.assign({}, state, ...newStates);
      }
      return state;
    case 'DESCRIBE_RESOURCES':
      if (action.payload.list && action.payload.list.length > 0) {
        const newStates = [];
        for (let i = 0; i < action.payload.list.length; i++) {
          newStates.push(get(state,
            action.payload.list[i].iri,
            action.payload.role,
            'description',
            description(action.payload.list[i].description)));
        }
        return Object.assign({}, state, ...newStates);
      }
      return state;
    case 'ADD_CLASS_INFO':
      const newStates = [];
      for (let i = 0; i < action.payload.list.length; i++) {
        newStates.push(get(state,
          action.payload.list[i].iri,
          '_',
          'classInfo',
          Object.assign(statusVObject('loaded'), action.payload.list[i].classInfo)));
      }
      return Object.assign({}, state, ...newStates);
    case 'FETCHING_CLASS_INFO_FAILED':
      if (action.payload.iri) {
        return {
          ...state,
          ...get(state, action.payload.iri, '_', 'classInfo', statusVObject('failed')),
        };
      }
      return state;
    case 'FETCHING_CLASS_INFO_PENDING':
      if (action.payload.iri) {
        return {
          ...state,
          ...get(state, action.payload.iri, '_', 'classInfo', statusVObject('loading')),
        };
      }
      return state;
    case 'FETCH_NEIGHBOURHOOD_PENDING':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'neighbourhood',
            action.payload.id,
            statusVObject('loaded')),
        };
      }
      return state;
    case 'FETCH_NEIGHBOURHOOD_REJECTED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'neighbourhood',
            action.payload.id,
            statusVObject('error')),
        };
      }
      return state;
    case 'FETCH_NEIGHBOURHOOD_FULFILLED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'neighbourhood',
            action.payload.id,
            Object.assign(statusVObject('loaded'), action.payload.data)),
        };
      }
      return state;
    case 'FETCH_SIM_PENDING':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'similarity',
            action.payload.id,
            statusVObject('loading')),
        };
      }
      return state;
    case 'FETCH_SIM_REJECTED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'similarity',
            action.payload.id,
            statusVObject('error')),
        };
      }
      return state;
    case 'FETCH_SIM_FULFILLED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'similarity',
            action.payload.id,
            {
              ...statusVObject('loaded'),
              data: action.payload.data,
            }),
        };
      }
      return state;
    case 'FETCH_INSTANCE_SAMPLES_FULFILLED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'instance_sample',
            action.payload.id,
            {
              ...statusVObject('loaded'),
              list: action.payload.list,
            }),
        };
      }
      return state;
    case 'FETCH_INSTANCE_SAMPLES_FAILED':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'instance_sample',
            action.payload.id,
            statusVObject('error')),
        };
      }
      return state;
    case 'FETCH_INSTANCE_SAMPLES_PENDING':
      if (action.payload.iri && action.payload.role && action.payload.id) {
        return {
          ...state,
          ...getWithId(state,
            action.payload.iri,
            action.payload.role,
            'instance_sample',
            action.payload.id,
            statusVObject('loaded')),
        };
      }
      return state;
    default:
      return state;
  }
};

resourcesReducer.id = 'resources';

export default resourcesReducer;
