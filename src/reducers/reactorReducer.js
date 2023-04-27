const reactorReducer = (state = {
  config: {},
}, action) => {
  switch (action.type) {
    case 'REACTOR_CONFIG_PENDING':
      return {
        ...state,
        config: { ...state.config, status: { value: 'loading', timestamp: Date.now() } },
      };
    case 'REACTOR_CONFIG_REJECTED':
      return {
        ...state,
        config: { ...state.config, status: { value: 'error', timestamp: Date.now() } },
      };
    case 'REACTOR_CONFIG_FULFILLED':
      return {
        ...state,
        config: {
          ...action.payload ? action.payload : {},
          status: { value: 'loaded', timestamp: Date.now() },
        },
      };
    default:
      return state;
  }
};

reactorReducer.id = 'reactor';

export default reactorReducer;
