import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import InfoBoxWidget from './InfoBoxWidget';
import roleSpecificEntryInMap from '../../../configuration/utils/roleSpecificEntryInMap';

/* map the resource values to this box */
function mapToProps(iri, role) {
  return (state) => {
    const reactorConfig = state.reactor ? state.reactor.config : {};
    if (iri in state.resources) {
      return {
        values: roleSpecificEntryInMap(state.resources[iri], role),
        reactorConfig,
      };
    }
    return { reactorConfig };
  };
}

/* reactor for info box widgets */
function InfoBoxReactor({
  iri, role, mode, intl,
}) {
  const Comp = connect(mapToProps(iri, role))(InfoBoxWidget);
  return <Comp iri={iri} role={role} mode={mode} intl={intl} />;
}

InfoBoxReactor.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

export default InfoBoxReactor;
