import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// i18n application
import I18nApp from './I18nApp';
// store
import store from './store';
// service worker
import * as serviceWorker from './serviceWorker';

/**
 * rendering the DOM with React
 */
ReactDOM.render((
  <Provider store={store}>
    <I18nApp />
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister(); // https://create-react-app.dev/docs/making-a-progressive-web-app
