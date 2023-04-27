import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { navigateToExploration } from '../../../../history/navigation';
import SearchState from '../../../../models/state/SearchState';
import AppBarCategorySelection from './AppBarCategorySelection';
import roleSpecificEntryInMap from '../../../../configuration/utils/roleSpecificEntryInMap';
import getCategoryMap from '../../../../utils/getCategoryMap';

/* styles for the the search bar */
const styles = makeStyles((theme) => ({
  searchNavBar: {
    paddingLeft: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(0.25),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  editor: {
    width: '100%',
    minHeight: '20em',
  },
  controlBox: {
    float: 'right',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

/* mapping the category config for the activated role */
const mapToProps = (state) => {
  const role = state.app && state.app.role ? state.app.role : '_';
  return {
    role,
    categoryConfig: getCategoryMap(state.app.config, state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.search, role).categories : null),
  };
};

/**
 * This React element is intended to be used in the app bar and allows the user
 * to search for something.
 *
 * @param role the active role.
 * @param categoryConfig config for categories that can be selected by the user.
 * @param intl object for internationalization.
 */
const AppBarSearchBar = ({ role, categoryConfig, intl }) => {
  const searchPhraseRef = React.createRef();
  const categoryRef = { current: {} };

  /**
     * handles a search request from the user.
     *
     * @param event of the triggered form submission.
     */
  const handleSearchRequest = (event) => {
    if (event) {
      event.preventDefault();
      if (searchPhraseRef.current && searchPhraseRef.current.value) {
        navigateToExploration(SearchState.of({
          role,
          searchText: searchPhraseRef.current.value,
          categories: categoryRef.current && categoryRef.current.value ? [categoryRef.current.value] : null,
        }));
      }
    }
  };

  const classes = styles();
  return (
    <form onSubmit={handleSearchRequest} key="app-bar-search-bar" className={classes.searchNavBar}>
      {categoryConfig
        ? <AppBarCategorySelection inputRef={categoryRef} categoryConfig={categoryConfig} intl={intl} /> : null}
      <FormControl>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            name="q"
            placeholder={intl.formatMessage({ id: 'app.search-bar.placeholder.short' })}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputRef={searchPhraseRef}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </FormControl>
    </form>
  );
};

export default connect(mapToProps)(AppBarSearchBar);
