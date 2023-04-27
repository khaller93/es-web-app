import React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
// material components
import LinearProgress from '@material-ui/core/LinearProgress';
// application
import App from './App';
// internationalization object
import { getMessages } from './i18n';
// configuration
import {
  getAppConfigAction,
  getExplorerConfig,
  getPrefixConfig,
  getReactorConfig,
} from './configuration';
// relay utils
import Relay from './relay/Relay';
import combineCheck from './relay/cpmbineCheck';
import combineFetch from './relay/combineFetch';
// prop types
import appType from './types/app';
import explorerConfigType from './types/explorerConfig';
import reactorConfigType from './types/reactorConfig';

/* mapping the  */
const mapToProps = (state) => ({
  app: state.app,
  explorerConfig: state.explorer.config,
  reactorConfig: state.reactor.config,
});

// fetch all required configs.
const fetch = (dispatch) => combineFetch([
  () => dispatch(getAppConfigAction()),
  () => dispatch(getExplorerConfig()),
  () => dispatch(getReactorConfig()),
  () => dispatch(getPrefixConfig()),
]);

// checks whether configs have been loaded.
const check = combineCheck([
  ({ app }) => (app.config ? app.config.status : null),
  ({ explorerConfig }) => (explorerConfig ? explorerConfig.status : null),
  ({ reactorConfig }) => (reactorConfig ? reactorConfig.status : null),
]);

/**
 * internationalization of the App, considering user settings.
 */
function I18nApp({
  app, explorerConfig, reactorConfig, dispatch,
}) {
  function Component() {
    const lang = app && app.language ? app.language : 'en';
    const InjectedIntlApp = injectIntl(App);
    return (
      <IntlProvider
        locale={lang}
        defaultLocale="en"
        timeZone={app.timeZone}
        messages={getMessages(lang)}
      >
        <InjectedIntlApp app={app} />
      </IntlProvider>
    );
  }

  return (
    <Relay
      values={{ app, explorerConfig, reactorConfig }}
      fetch={fetch(dispatch)}
      check={check}
      component={Component}
      loadingFallback={LinearProgress}
    />
  );
}

I18nApp.defaultProps = {
  explorerConfig: {},
  reactorConfig: {},
};

I18nApp.propTypes = {
  app: appType.isRequired,
  explorerConfig: explorerConfigType,
  reactorConfig: reactorConfigType,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapToProps)(I18nApp);
