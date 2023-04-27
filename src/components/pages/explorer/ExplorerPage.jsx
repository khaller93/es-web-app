import React from 'react';
import * as PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
// pages
import SearchExplorer from './SearchExplorer';
import TreeViewPage from './TreeViewPage';
import SPARQLExplorer from './SPARQLExplorer';
import PathNotFoundPage from '../PathNotFoundPage';
// navigation
import history from '../../../history';
import { getPathFor } from '../../../history/navigation';
// utils
import withProps from '../../../utils/withProps';
// prop types
import appType from '../../../types/app';

/**
 * This React page switches between the different interaction models
 * for exploration.
 *
 * @param app store of the global app information.
 * @param intl internationalization object.
 */
function ExplorerPage({ app, intl }) {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path={getPathFor('Explorer', { params: { method: 'search' } })}
          component={withProps(SearchExplorer, { intl, app })}
        />
        {app.config && app.config.enable && app.config.enable.sparql
          ? (
            <Route
              path={getPathFor('Explorer', { params: { method: 'sparql' } })}
              component={withProps(SPARQLExplorer, { intl, app })}
            />
          ) : null}
        {app.config && app.config.enable && app.config.enable.treeview
          ? (
            <Route
              path={getPathFor('Explorer', { params: { method: 'treeview' } })}
              component={withProps(TreeViewPage, { intl, app })}
            />
          ) : null}
        <Route component={withProps(PathNotFoundPage, { intl, app })} />
      </Switch>
    </Router>
  );
}

ExplorerPage.propTypes = {
  app: appType.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

export default ExplorerPage;
