import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
// navigation
import ListIcon from '@material-ui/icons/List';
import { FormattedMessage } from 'react-intl';
import { navigate } from '../../../history/navigation';
// style
import explorationNavMenuStyles from './jss/explorationNavMenu';

/**
 * navigate to the SPARQL editor.
 */
function navigateToSPARQLEditor() {
  navigate('Explorer', { params: { method: 'sparql' } });
}

/**
 * navigates to the corresponding SPARQL url.
 */
const navigateToTreeView = () => {
  navigate('Explorer', { params: { method: 'treeview' } });
};

function ExplorationNavigationMenu({ choices, config }) {
  const classes = explorationNavMenuStyles();
  const menus = [];
  if (choices.includes('Search')) {

  }
  if (choices.includes('SPARQL')) {
    if (config.enable.sparql) {
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
  }
  if (choices.includes('TreeView')) {
    if (config.enable.treeview) {
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
  return menus;
}

ExplorationNavigationMenu.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
};

export default ExplorationNavigationMenu;
