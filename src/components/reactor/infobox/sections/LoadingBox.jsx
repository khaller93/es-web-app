import React from 'react';
// material ui components
import CircularProgress from '@material-ui/core/CircularProgress';
// styles
import loadingBoxStyles from './jss/loadingBox';

/**
 * A box showing a loading circle that can be placed
 * into a basic section.
 */
function LoadingBox() {
  const classes = loadingBoxStyles();

  return (
    <div className={classes.progressBox}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default LoadingBox;
