import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Typography from '@material-ui/core/Typography';
// ESS section components
import LoadingBox from './LoadingBox';
import Relay from '../../../../relay/Relay';

/**
 *
 */
function BasicSectionComponent({
  section, sectionProps, isMisconfigured, fetch, check, values,
}) {
  if (isMisconfigured) {
    return (
      <Typography color="secondary">
        This section has been configured wrongly.
      </Typography>
    );
  }

  return (
    <Relay
      fetch={fetch}
      check={check}
      values={values}
      component={section}
      componentProps={sectionProps}
      loadingFallback={LoadingBox}
    />
  );
}

BasicSectionComponent.defaultProps = {
  isMisconfigured: false,
  sectionProps: {},
  values: {},
};

BasicSectionComponent.propTypes = {
  section: PropTypes.elementType.isRequired,
  sectionProps: PropTypes.instanceOf(Object),
  isMisconfigured: PropTypes.bool,
  fetch: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Object),
};

export default BasicSectionComponent;
