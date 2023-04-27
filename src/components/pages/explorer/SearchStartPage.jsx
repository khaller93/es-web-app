import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// material UI components
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
// JSS styles
import searchStartStyles from './jss/searchStartStyles';
// ess components
import Page from '../Page';
import SearchBar from '../../elements/search/SearchBar';
import FacetBox from '../../elements/facet/FacetBox';
import CategorySelectionTabs from '../../elements/search/CategorySelectionTabs';
// utils
import roleSpecificEntryInMap from '../../../configuration/utils/roleSpecificEntryInMap';
import { resolve } from '../../../configuration';
import getCategoryMap from '../../../utils/getCategoryMap';
// state model
import SearchState from '../../../models/state/SearchState';
// navigation
import { navigate, navigateToExploration } from '../../../history/navigation';
// prop types
import appType from '../../../types/app';
import explorerType from '../../../types/explorer';

/**
 * This React element is intended to be used as a starting page.
 * It provides a simple search interface similar to major search
 * engines such as Google or Bing.
 *
 * @author Kevin Haller
 * @version 1.0.0
 * @since 1.0.0
 */
function SearchStartPage({
  app, explorer, intl,
}) {
  const classes = searchStartStyles();

  const searchTextInputRef = React.createRef();
  const categoryRef = React.createRef();

  /**
   *
   * @param text for which a new search shall be issued.
   */
  const handleSearchRequest = (text) => {
    navigateToExploration(SearchState.of({
      role: app.role ? app.role : '_',
      searchText: text,
      categories: categoryRef.current ? categoryRef.current.value : null,
    }));
  };

  /**
   * navigates to the corresponding SPARQL url.
   */
  const navigateToSPARQLEditor = () => {
    navigate('Explorer', { params: { method: 'sparql' } });
  };

  /**
   * navigates to the corresponding SPARQL url.
   */
  const navigateToTreeView = () => {
    navigate('Explorer', { params: { method: 'treeview' } });
  };

  const categoryList = explorer.config ? roleSpecificEntryInMap(explorer.config.search,
    app.role).categories : null;
  const catConfig = getCategoryMap(app.config, categoryList);

  const menus = [];
  if (app.config && app.config.enable) {
    if (app.config.enable.sparql) {
      menus.push((
        <Button
          color="inherit"
          key="sparql-appbar-menu"
          onClick={navigateToSPARQLEditor}
        >
          <EditIcon
            className={classes.sparqlEditIcon}
          />
          SPARQL
        </Button>
      ));
    }
    if (app.config.enable.treeview) {
      menus.push((
        <Button
          color="inherit"
          key="treeview-appbar-menu"
          onClick={navigateToTreeView}
        >
          <ListIcon
            className={classes.treeViewIcon}
          />
          <FormattedMessage id="app.menu.treeview" />
        </Button>
      ));
    }
  }
  return (
    <Page menus={menus} className={classes.root}>
      <Container className={classes.searchBox}>
        <Box className={classes.searchPageHeaderBox}>
          <img src={resolve('neuron.svg')} alt="" className={classes.searchPageHeader} />
        </Box>
        {categoryList ? (
          <CategorySelectionTabs
            componentProps={{
              centered: true,
              className: classes.categoryNav,
            }}
            categoryConfig={catConfig || []}
            inputRef={categoryRef}
            intl={intl}
          />
        ) : null}
        <SearchBar
          autoFocus
          name="q"
          placeholder={intl.formatMessage({
            id: 'app.search-bar.placeholder',
          })}
          componentProps={{
            className: classes.searchBar,
          }}
          onSearchIssued={handleSearchRequest}
          inputRef={searchTextInputRef}
          intl={intl}
        />
        {explorer.config && explorer.config.facet ? (
          <FacetBox
            role={app.role}
            className={classes.facetBox}
            config={roleSpecificEntryInMap(explorer.config.facet, app.role)}
            intl={intl}
          />
        ) : null}
      </Container>
    </Page>
  );
}

SearchStartPage.propTypes = {
  app: appType.isRequired,
  explorer: explorerType.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};
export default connect((state) => ({ explorer: state.explorer }))(SearchStartPage);
