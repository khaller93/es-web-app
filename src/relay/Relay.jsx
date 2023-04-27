import React from 'react';
import * as PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import withProps from '../utils/withProps';

/**
 * A relay waits for specific data to be fetched and displays the given component only
 * after the data has been fetched successfully. You can specify React components that
 * shall be displayed while the data is loaded and if the fetching fails.
 *
 * @since 1.0.0
 * @version 1.0.0
 * @author Kevin Haller
 */
function Relay({
  values, fetch, check,
  component, componentProps,
  loadingFallback = LinearProgress, loadingProps,
  errorFallback, errorProps,
}) {
  React.useEffect(() => {
    const status = check(values);
    if (!(status && status.value)) {
      fetch(values);
    }
  }, [fetch, check, values]);

  const status = check(values);
  if (status.value === 'loading' && loadingFallback) {
    const LoadingFallback = withProps(loadingFallback, loadingProps);
    return <LoadingFallback />;
  }
  if (status.value === 'error' && errorFallback) {
    const ErrorFallback = withProps(errorFallback, errorProps);
    return <ErrorFallback />;
  }
  if (status.value === 'loaded') {
    const Component = withProps(component, componentProps);
    return <Component />;
  }
  return null;
}

Relay.defaultProps = {
  values: {},
  componentProps: {},
  loadingFallback: LinearProgress,
  loadingProps: {},
  errorFallback: null,
  errorProps: {},
};

Relay.propTypes = {
  values: PropTypes.instanceOf(Object),
  fetch: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired,
  componentProps: PropTypes.instanceOf(Object),
  loadingFallback: PropTypes.elementType,
  loadingProps: PropTypes.instanceOf(Object),
  errorFallback: PropTypes.elementType,
  errorProps: PropTypes.instanceOf(Object),
};

export default Relay;
