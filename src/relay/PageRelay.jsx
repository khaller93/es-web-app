import React from 'react';
import * as PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Relay from './Relay';
import mapURLParams from '../utils/mapURLParams';

/**
 * A relay specifically for pages.
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author Kevin Haller
 */
function PageRelay({
  role, state, stateType, location, fetch, page, pageProps,
  loadingFallback, loadingProps,
  errorFallback, errorProps,
}) {
  const requestedStateParams = mapURLParams(location);
  const requestedState = stateType.assembleFromQueryParams(role, requestedStateParams);

  function fetchP() {
    return fetch(requestedState);
  }

  function check(valueArg) {
    if (valueArg.requested) {
      if (stateType.of({ ...valueArg.current }).match(valueArg.requested) && valueArg.status) {
        return { value: valueArg.status };
      }
      return {};
    }
    return { value: 'error' };
  }

  const values = {
    current: state.state,
    requested: requestedState,
    status: state.status,
  };

  return (
    <Relay
      fetch={fetchP}
      check={check}
      values={values}
      component={page}
      componentProps={pageProps}
      loadingFallback={loadingFallback}
      loadingProps={loadingProps}
      errorFallback={errorFallback}
      errorProps={errorProps}
    />
  );
}

PageRelay.defaultProps = {
  loadingFallback: LinearProgress,
  loadingProps: {},
  errorFallback: null,
  errorProps: {},
};

PageRelay.propTypes = {
  role: PropTypes.string.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
  stateType: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  fetch: PropTypes.func.isRequired,
  page: PropTypes.elementType.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
  loadingFallback: PropTypes.elementType,
  loadingProps: PropTypes.instanceOf(Object),
  errorFallback: PropTypes.elementType,
  errorProps: PropTypes.instanceOf(Object),
};

export default PageRelay;
