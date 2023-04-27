import { getBaseLanguage, getLocale, getTimezone } from '../i18n';
import { getState } from '../store/localstorage';

/**
 * This reducer handles all the actions for the general app state.
 *
 * @param state on which the given action shall be executed.
 * @param action that shall be executed.
 * @return {*} new state.
 */
const appReducer = (state = ({
  locale: getLocale(),
  language: getBaseLanguage(),
  timezone: getTimezone(),
  ...getState(appReducer.id),
}), action) => {
  switch (action.type) {
    case 'APP_CONFIG_PENDING':
      return {
        ...state,
        config: { ...state.config, status: { value: 'loading', timestamp: Date.now() } },
      };
    case 'APP_CONFIG_REJECTED':
      return {
        ...state,
        config: { ...state.config, status: { value: 'error', timestamp: Date.now() } },
      };
    case 'APP_CONFIG_FULFILLED':
      return {
        ...state,
        config: {
          ...action.payload ? action.payload : {},
          status: { value: 'loaded', timestamp: Date.now() },
        },
        role: action.payload && action.payload.default_role ? action.payload.default_role : '_',
      };
    case 'SWITCH_LANGUAGE':
      const { language } = action.payload;
      if (language && state.config && state.config.supported_languages
        && state.config.supported_languages.includes(language)) {
        return { ...state, language };
      }
      return state;
    case 'SWITCH_ROLE':
      const { role } = action.payload;
      if (role && state.config && state.config.roles && role in state.config.roles) {
        return { ...state, role };
      }
      return state;
    default:
      return state;
  }
};

appReducer.id = 'app';

export default appReducer;
