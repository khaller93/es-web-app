import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RedoIcon from '@material-ui/icons/Redo';
import parseState from '../../../../models/state';
import { navigateToExploration } from '../../../../history/navigation';

/* styles for the search item */
const styles = makeStyles((theme) => ({
  sparql: {
    marginRight: '0.25rem',
    fontWeight: 'bold',
  },
  sparqlText: {
    fontSize: '0.75em',
  },
}));

/**
 * This history item is intended to visualize a SPARQL query state.
 */
const SPARQLSearchItem = ({ state: sparqlState, maxLength = 128, onClick }) => {
  /**
     * gets the SPARQL text for the item.
     *
     * @return {string} text that is displayed in the item.
     */
  const getItemQueryText = () => (sparqlState.text ? (sparqlState.length < maxLength ? sparqlState.text : `${sparqlState.text.substring(0, maxLength)} ...`) : '');

  /**
     * handles the click of this SPARQL item.
     */
  const handleClick = () => {
    if (onClick) {
      onClick();
      navigateToExploration(parseState(sparqlState));
    }
  };

  const classes = styles();
  return (
    <Tooltip disableFocusListener title={sparqlState.text}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EditIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={(
            <>
              <Typography className={classes.sparql}>
                <FormattedMessage
                  id="app.menu.history.sparql"
                />
:
              </Typography>
            </>
                      )}
          secondary={(
            <>
              <span className={classes.sparqlText}>
                {getItemQueryText()}
              </span>
            </>
                      )}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="visit" onClick={handleClick}>
            <RedoIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Tooltip>
  );
};

SPARQLSearchItem.propTypes = {
  state: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default SPARQLSearchItem;
