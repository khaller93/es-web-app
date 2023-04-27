import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as yasqe from "yasgui-yasqe";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Page from "../Page";
import AppBarSearchBar from "../../elements/search/appbar/AppBarSearchBar";
import { startExploration } from "../../../actions/explorer";
import SPARQLState from "../../../models/state/SPARQLState";
import ResultTable from "../../elements/sparql/ResultTable";
import { updateSPARQLEditor } from "../../../actions/sparqlExplorer";
import AskResultField from "../../elements/sparql/AskResultField";
import { navigate, navigateToExploration } from "../../../history/navigation";

import 'yasgui-yasqe/dist/yasqe.min.css';
import * as queryString from "query-string";
import ListIcon from "@material-ui/icons/List";
import sparqlExplorerStyle from './jss/sparqlExplorer';

const mapToProps = state => {
  const id = state.sparqlExplorer.state ? state.sparqlExplorer.state.id : null;
  const role = state.app && state.app.role ? state.app.role : '_';
  return {
    role: role,
    state: state.sparqlExplorer.state,
    text: state.sparqlExplorer.editor ? state.sparqlExplorer.editor.text : '',
    type: state.sparqlExplorer.editor ? state.sparqlExplorer.editor.type : null,
    data: id && state.sparqlExplorer.data ? state.sparqlExplorer.data[id] : null,
    status: id && state.sparqlExplorer.status ? state.sparqlExplorer.status[id] : null,
    appConfig: state.app.config,
  };
};

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

const createResultTable = (type, data, role, intl) => {
  switch (type) {
    case 'SELECT':
      if (data && data.head && data.head.vars) {
        return <ResultTable columns={data.head.vars}
                            bindings={data.results && data.results.bindings ? data.results.bindings : null}
                            role={role} intl={intl}/>;
      }
      break;
    case 'ASK':
      if (data) {
        return <AskResultField value={data.boolean} role={role} intl={intl}/>;
      }
      break;
    default:
      return null;
  }
  return null;
};

/**
 * This React page organizes a graphical user interface for SPARQL querying.
 */
const SPARQLExplorer = ({ role, state, status, appConfig, text, type, data, intl, location, dispatch }) => {
  const [yasqueEditor, setYasqueEditor] = React.useState(null);

  const classes = sparqlExplorerStyle();

  const urlParams = mapParams(location);
  const urlState = SPARQLState.assembleFromQueryParams(role, urlParams);
  if (urlState && !SPARQLState.of({ ...state }).match(urlState)) {
    dispatch(startExploration(urlState));
    dispatch(updateSPARQLEditor(urlState.plainObject));
  }

  useEffect(() => {
    if (!yasqueEditor) {
      const y = yasqe.fromTextArea(document.getElementById("sparql-editor-textarea"));
      setYasqueEditor(y);
      y.on('change', (event, t) => {
        dispatch(updateSPARQLEditor({
          text: y.getValue(),
          type: event.queryType,
        }));
      });
    }
  }, [yasqueEditor, dispatch]);

  if (yasqueEditor && yasqueEditor.getValue() !== text) {
    yasqueEditor.setValue(text);
  }

  /**
   * checks whether the current SPARQL state failed, or not.
   */
  const didQueryingFail = () => {
    return status === 'error' && state.text === text;
  };

  /**
   * checks whether the current SPARQL state is loading, or not.
   */
  const isQueryingLoading = () => {
    return status === 'loading';
  };

  /**
   * checks whether the current SPARQL state is fulfilled, or not.
   */
  const isQueryingOk = () => {
    if (status === 'fulfilled') {
      return state.text === text;
    }
    return false;
  };

  /**
   * handles the SPARQL query request.
   */
  const handleQueryRequest = () => {
    navigateToExploration(SPARQLState.of({ role, text, type }));
  };

  const queryButtonClassname = clsx({
    [classes.queryButtonSuccess]: isQueryingOk(),
    [classes.queryButtonFailed]: didQueryingFail(),
  });

  /**
   * navigates to the corresponding SPARQL url.
   */
  const navigateToTreeView = () => {
    navigate('Explorer', { params: { method: 'treeview' } });
  };

  const menus = [];
  if (appConfig && appConfig.enable) {
    if (appConfig.enable.treeview) {
      menus.push(<Button color="inherit" key="treeview-appbar-menu"
                         onClick={navigateToTreeView}><ListIcon
        className={classes.treeViewIcon}/><FormattedMessage id="app.menu.treeview"/></Button>);
    }
  }
  return (
    <Page menus={[<AppBarSearchBar key="app-bar-search-bar" intl={intl}/>, ...menus]}>
      <Container fixed>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <textarea id="sparql-editor-textarea"/>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.controlBox}>
              <div className={classes.controlBoxWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={queryButtonClassname}
                  disabled={isQueryingLoading()}
                  onClick={handleQueryRequest}
                >
                  <FormattedMessage id="app.sparql.editor.send-query"/>
                </Button>
                {isQueryingLoading() &&
                <CircularProgress size={24} className={classes.queryButtonProgress}/>}
              </div>
              <div className={classes.controlBoxWrapper} style={{ marginLeft: '0.25rem' }}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={queryButtonClassname}
                  onClick={handleQueryRequest}
                >
                  {isQueryingOk() ? <CheckIcon/> :
                    didQueryingFail() ?
                      <CancelIcon/>
                      : <Icon className={classes.rightIcon}>send</Icon>}
                </Fab>
                {isQueryingLoading() &&
                <CircularProgress size={68} className={classes.queryFabProgress}/>}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.resultBox}>
            {createResultTable(type, data, role, intl)}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default connect(mapToProps)(SPARQLExplorer);