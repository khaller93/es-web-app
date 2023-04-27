import React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Page from '../Page';
import { navigate, navigateToExploration } from '../../../history/navigation';
import AppBarSearchBar from '../../elements/search/appbar/AppBarSearchBar';
import TreeViewSidebar from '../../elements/treeview/TreeViewSidebar';
import roleSpecificEntryInMap from '../../../configuration/utils/roleSpecificEntryInMap';
import viewSpecificTreeViewConfig from '../../../configuration/utils/viewSpecificTreeViewConfig';
import intLabelInMap from '../../../configuration/intLabelInMap';
import TreeViewState from '../../../models/state/TreeViewState';
import { startExploration } from '../../../actions/explorer';
import { selectResourceInView } from '../../../actions/treeview';
import InfoBoxReactor from '../../reactor/infobox/InfoBoxReactor';

/* styles for the start page */
const styles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'lightgray',
  },
  treeViewSideBar: {
    padding: theme.spacing(1.5),
  },
  loadingBar: {
    marginLeft: theme.spacing(-3),
  },
  sparqlEditIcon: {
    marginRight: theme.spacing(0.75),
  },
}));

/* extracts the query parameters from the url */
const mapParams = (location) => {
  if (location && location.search) {
    const params = { ...queryString.parse(location.search) };
    if (params) {
      return params;
    }
  }
  return {};
};

/* map to props for the page */
const mapToProps = (state) => {
  const role = state.app.role ? state.app.role : '_';
  const generalConfig = state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.treeview, role) : null;
  const searchConfig = state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.search, role) : null;
  const tvState = state.treeview.state;
  const resultId = tvState ? tvState.id : null;
  const result = state.treeview.data ? state.treeview.data[resultId] : null;
  const status = state.treeview.status ? state.treeview.status[resultId] : null;
  return {
    role,
    reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
    treeView: state.treeview,
    state: tvState,
    result,
    status,
    config: {
      general: generalConfig,
      description: searchConfig ? searchConfig.snippet : {},
      supportedLanguages: state.app.config && state.app.config.supported_languages ? state.app.config.supported_languages : [],
    },
  };
};

/**
 * This React page displays a tree view of certain relationships.
 */
const TreeViewPage = ({
  app, role, state, result, status, treeView, reactorConfig, config, location, dispatch, intl,
}) => {
  const classes = styles();

  const urlParams = mapParams(location);
  /* check if exploration request is required */
  const urlSearchState = TreeViewState.assembleFromQueryParams(role, urlParams);
  if (config && config.general && urlSearchState) {
    if (!urlParams || Object.keys(urlParams).length === 0) {
      if (config.general.views && config.general.views.length > 0) {
        if (config.general.default_view) {
          urlSearchState.view = config.general.default_view;
        }
        if (config.general.views && config.general.views.length > 0) {
          urlSearchState.view = config.general.views[0];
        }
      }
    }
    if (!TreeViewState.of({ ...treeView.state }).match(urlSearchState)) {
      dispatch(startExploration(urlSearchState, {
        ...config,
        treeview: urlSearchState.view ? viewSpecificTreeViewConfig(config.general, urlSearchState.view) : {},
      }));
      navigateToExploration(urlSearchState);
    }
  }

  /**
     *
     *
     * @param event of the tab selection.
     * @param viewIndex
     */
  const handleViewSelection = (event, viewIndex) => {
    if (viewIndex === undefined || viewIndex === null) {
      viewIndex = 0;
    }
    if (config.general.views) {
      navigateToExploration(TreeViewState.of({ ...treeView.state, view: config.general.views[viewIndex] }));
    }
  };

  /**
     * navigates to the corresponding SPARQL url.
     */
  const navigateToSPARQLEditor = () => {
    navigate('Explorer', { params: { method: 'sparql' } });
  };

  /**
     * handle the selection of a new resource.
     *
     * @param selectedIRI resource that has been selected by the user.
     */
  const handleResourceSelection = (selectedIRI) => {
    console.log('Click:', selectedIRI);
    dispatch(selectResourceInView(selectedIRI));
    navigateToExploration(TreeViewState.of({ ...state, selectedIRI }));
  };

  const menus = [<AppBarSearchBar key="app-bar-search-bar" intl={intl} />];
  if (app.config && app.config.enable) {
    if (app.config.enable.sparql) {
      menus.push(<Button color="inherit" key="sparql-appbar-menu" onClick={navigateToSPARQLEditor}>
        <EditIcon
          className={classes.sparqlEditIcon}
        />
        SPARQL
                 </Button>);
    }
  }

  return (
    <Page menus={menus}>
      <Grid container>
        {config && config.general && config.general.views && config.general.views.length > 0
          ? (
            <AppBar position="static" className={classes.appBar}>
              <Grid item xs={12}>
                {config.general && config.general.views ? (
                  <Tabs
                    indicatorColor="secondary"
                    textColor="secondary"
                    value={state.view ? config.general.views.indexOf(state.view) : 0}
                    onChange={handleViewSelection}
                    aria-label="disabled tabs example"
                  >
                    {config.general.views.map((v, index) => {
                        if (config.general.view && config.general.view[v]) {
                          if (config.general.view[v].name) {
                            return (
                                <Tab
                                    selected key={`view-tab-${index}`}
                                    label={intLabelInMap(config.general.view[v].name, intl)}
                                  />
                            );
                          }
                        }
                        return null;
                      })}
                  </Tabs>
                ) : null}
              </Grid>
            </AppBar>
          ) : null}
        <Grid item xs={12} className={classes.treeViewSideBar}>
          {status === 'loading' ? <LinearProgress className={classes.loadingBar} /> : null}
        </Grid>
        <Grid item xs={6} className={classes.treeViewSideBar}>
          <TreeViewSidebar
            result={result}
            role={role}
            view={state.view}
            reactorConfig={reactorConfig}
            onResourceSelected={handleResourceSelection}
            selectedIRI={state.selectedIRI}
            treeViewConfig={viewSpecificTreeViewConfig(config.general, state.view)}
            intl={intl}
          />
        </Grid>
        {result ? (
          <Grid item xs={6}>
            {state && state.selectedIRI ? (
              <InfoBoxReactor iri={state.selectedIRI} role={role} mode="view" intl={intl} />
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </Page>
  );
};

export default connect(mapToProps)(TreeViewPage);
