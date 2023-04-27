import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RedoIcon from '@material-ui/icons/Redo';
import intLabelInMap from '../../../../configuration/intLabelInMap';
import roleSpecificEntryInMap from '../../../../configuration/utils/roleSpecificEntryInMap';
import { navigateToExploration } from '../../../../history/navigation';
import parseState from '../../../../models/state';
import getCategoryMap from '../../../../utils/getCategoryMap';

/* styles for the search item */
const styles = makeStyles((theme) => ({
  searched: {
    marginRight: '0.25rem',
    fontWeight: 'bold',
  },
}));

/* maps the category config to this item */
const mapStateToItem = (state) => {
  const role = state.app && state.app.role ? state.app.role : '_';
  return {
    categoryConfig: getCategoryMap(state.app.config, state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.search, role).categories : null),
  };
};

/**
 * This history item is intended to visualize a search state.
 */
const SearchItem = ({
  state: searchState, categoryConfig, onClick, intl,
}) => {
  /**
     * handles the click of this search item.
     */
  const handleClick = () => {
    if (onClick) {
      onClick();
      navigateToExploration(parseState(searchState));
    }
  };

  const classes = styles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <SearchIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={(
          <>
            <Typography>
              <span className={classes.searched}>
                <FormattedMessage
                  id="app.menu.history.searched"
                />
:
              </span>
              "
              {searchState.searchText}
              "
            </Typography>
          </>
                  )}
        secondary={(
          <>
            <Typography color="secondary" component="span">
              {searchState.categories && searchState.categories.length > 0 ? (
                searchState.categories.map((cat) => {
                  if (categoryConfig && categoryConfig[cat] && categoryConfig[cat].name) {
                    return intLabelInMap(categoryConfig[cat].name, intl);
                  }
                  return null;
                }).join(' - ')
              ) : <FormattedMessage id="app.search-bar.all-category" />}
            </Typography>
          </>
                  )}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="visit" onClick={handleClick}>
          <RedoIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

SearchItem.propTypes = {
  state: PropTypes.object.isRequired,
  categoryConfig: PropTypes.object,
  onClick: PropTypes.func,
  intl: PropTypes.any.isRequired,
};

export default connect(mapStateToItem)(SearchItem);
