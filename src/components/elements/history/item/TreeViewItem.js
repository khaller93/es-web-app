import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RedoIcon from '@material-ui/icons/Redo';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { navigateToExploration } from '../../../../history/navigation';
import parseState from '../../../../models/state';
import roleSpecificEntryInMap from '../../../../configuration/utils/roleSpecificEntryInMap';
import intLabelInMap from '../../../../configuration/intLabelInMap';

/* styles for the search item */
const styles = makeStyles((theme) => ({
  treeView: {
    marginRight: '0.25rem',
    fontWeight: 'bold',
  },
}));

/* maps the category config to this item */
const mapStateToItem = (state) => {
  const role = state.app && state.app.role ? state.app.role : '_';
  return {
    treeViewConfig: state.explorer.config ? roleSpecificEntryInMap(state.explorer.config.treeview, role) : {},
  };
};

/**
 * This history item is intended to visualize a search state.
 */
const TreeViewItem = ({
  state: searchState, treeViewConfig, onClick, intl,
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

  let viewMap = {};
  if (searchState && searchState.view && treeViewConfig && treeViewConfig.view && treeViewConfig.view[searchState.view]) {
    viewMap = treeViewConfig.view[searchState.view];
  }

  const classes = styles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ListIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={(
          <>
            <Typography className={classes.treeView}>
              TreeView:
            </Typography>
          </>
                  )}
        secondary={(
          <>
            <Typography className={classes.treeView}>
              {intLabelInMap(viewMap.name, intl)}
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

TreeViewItem.propTypes = {
  state: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  intl: PropTypes.any.isRequired,
};

export default connect(mapStateToItem)(TreeViewItem);
