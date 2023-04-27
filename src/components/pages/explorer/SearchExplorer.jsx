import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
// material ui components
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// style
import searchExplorerStyle from './jss/searchExplorer';
// page components
import ExplorationNavigationMenu from './ExplorationNavigationMenu';
import Page from '../Page';
// ESS elements
import SearchBar from '../../elements/search/SearchBar';
import CategorySelectionTabs from '../../elements/search/CategorySelectionTabs';
import SearchResponseMetaInfo from '../../elements/search/SearchResponseMetaInfo';
// ESS reactor elements
import SEResultList from '../../reactor/object/list/SEResultList';
import InfoBoxReactor from '../../reactor/infobox/InfoBoxReactor';
// relay
import PageRelay from '../../../relay/PageRelay';
// redux actions
import { startExploration } from '../../../actions/explorer';
import { updateCategories, updateSearchText } from '../../../actions/searchBar';
// navigation utils
import SearchState from '../../../models/state/SearchState';
import { navigateToExploration } from '../../../history/navigation';
// utils map
import mapURLParams from '../../../utils/mapURLParams';
import getCategoryMap from '../../../utils/getCategoryMap';
import roleSpecificEntryInMap from '../../../configuration/utils/roleSpecificEntryInMap';
// configuration
import appConfigType from '../../../types/appConfig';
import explorerConfigType from '../../../types/explorerConfig';
import statusType from '../../../types/status';
import ESState from '../../../models/state/ESState';

/* mapping the redux store to component props */
const mapToProps = (state) => {
  const role = state.app && state.app.role ? state.app.role : '_';
  const searchStateId = state.explorer.state ? state.explorer.state.id : null;
  const appConfig = state.app.config;
  const searchConfig = state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.search,
    role) : {};
  return {
    role,
    /* search infos */
    search: {
      state: state.explorer.state,
      status: searchStateId && state.explorer.status ? state.explorer.status[searchStateId] : null,
    },
    resultDict: searchStateId && state.explorer.resultDict
      ? state.explorer.resultDict[searchStateId] : null,
    /* config stores */
    config: {
      app: appConfig,
      search: searchConfig,
      categories: getCategoryMap(appConfig, searchConfig.categories),
    },
  };
};

/**
 * The page content that shall be displayed on the search explorer.
 */
function SPage({
  role, search, resultDict, location, intl,
}) {
  const classes = searchExplorerStyle();
  const urlParams = mapURLParams(location);
  console.log('State:>', search.state);
  return (
    <>
      <Box className={classes.searchInfoBox}>
        {resultDict ? (
          <SearchResponseMetaInfo
            total={resultDict.total}
            timeInMs={resultDict.time}
            intl={intl}
          />
        ) : null}
      </Box>
      <Grid container>
        <Grid item sm={6} xs={12}>
          {resultDict ? (
            <SEResultList
              className={classes.searchResultBox}
              esState={SearchState.of(search.state)}
              start={urlParams.start ? parseInt(urlParams.start) : 0}
              resultList={resultDict.list}
              total={resultDict.total}
              role={role}
              mode="view"
              intl={intl}
            />
          ) : null}
        </Grid>
        <Grid item sm={6} xs={12}>
          {resultDict && resultDict.list && resultDict.list.length > 0
            ? <InfoBoxReactor iri={resultDict.list[0]} role={role} mode="view" intl={intl} /> : null}
        </Grid>
      </Grid>
    </>
  );
}

/**
 * This React page renders the interactive UI for exploring the knowledge graph through searching.
 */
const SearchExplorer = (props) => {
  const {
    role, search, config, location, intl, dispatch,
  } = props;
  const classes = searchExplorerStyle();

  const searchTextInputRef = React.createRef();
  const categoriesInputRef = React.createRef();

  function fetch(state) {
    dispatch(updateSearchText(state.searchText));
    dispatch(updateCategories(state.categories));
    dispatch(startExploration(state, config));
  }

  /**
   * handles the categories selected by the user.
   *
   * @param cats which shall be included in the search.
   */
  function handleCategorySelection(cats) {
    navigateToExploration(SearchState.of({
      role,
      searchText: searchTextInputRef.current.value,
      categories: cats,
    }));
  }

  /**
   * deals with the request of starting a new search.
   */
  function handleSearchRequest() {
    navigateToExploration(SearchState.of({
      role,
      searchText: searchTextInputRef.current.value,
      categories: categoriesInputRef.current.value,
    }));
  }

  return (
    <Page menus={<ExplorationNavigationMenu choices={['SPARQL', 'TreeView']} config={config.app} />}>
      <Box className={classes.searchBox}>
        <SearchBar
          autoFocus
          name="q"
          componentProps={{
            className: classes.searchBar,
          }}
          inputRef={searchTextInputRef}
          onSearchIssued={handleSearchRequest}
          intl={intl}
        />
        {config.categories ? (
          <CategorySelectionTabs
            componentProps={{
              className: classes.searchBoxNav,
            }}
            activeCategory={search.bar && search.bar.categories ? search.bar.categories[0] : null}
            categoryConfig={config.categories}
            onChange={handleCategorySelection}
            inputRef={categoriesInputRef}
            intl={intl}
          />
        ) : null}
      </Box>
      {search ? (
        <PageRelay
          role={role}
          state={search}
          stateType={SearchState}
          fetch={fetch}
          location={location}
          page={SPage}
          pageProps={props}
        />
      ) : null}
    </Page>
  );
};

const expected = {
  role: PropTypes.string.isRequired,
  search: PropTypes.shape({
    state: PropTypes.instanceOf(Object),
    status: statusType,
  }).isRequired,
  resultDict: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
    total: PropTypes.number,
    time: PropTypes.number,
  }),
  config: PropTypes.shape({
    app: appConfigType,
    search: explorerConfigType,
    categories: PropTypes.instanceOf(Object),
  }).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
  dispatch: PropTypes.func.isRequired,
};

SPage.defaultProps = {
  resultDict: {},
};

SearchExplorer.propTypes = expected;
SPage.propTypes = expected;

export default connect(mapToProps)(SearchExplorer);
