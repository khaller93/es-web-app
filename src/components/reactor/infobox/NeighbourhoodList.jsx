import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
// material ui components
import Grid from '@material-ui/core/Grid';
// ESS elements
import PropertyReactor from '../property/PredicateReactor';
// relay
import Relay from '../../../relay/Relay';
import combineFetch from '../../../relay/combineFetch';
// redux actions
import { fetchNeighbourhood, gatherClassInformation } from '../../../actions/resources';
// utils
import { infoBoxPredicate } from '../../../configuration/reactorConfiguration';
// styles
import neighbourhoodListStyles from './jss/neighbourhoodList';
import combineCheck from '../../../relay/cpmbineCheck';
// types
import sectionConfigType from '../../../types/section/sectionConfig';

const mapReactorConfig = (state) => ({
  reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
});

const getConfig = (role, predicate, resourceIRI, values) => (config) => infoBoxPredicate(config,
  role,
  predicate,
  resourceIRI,
  { classes: values.classInfo && values.classInfo.all ? values.classInfo.all : [] });

const orderFn = (config, role, iri, values) => (a, b) => {
  const confA = getConfig(role, a, iri, values)(config);
  const confB = getConfig(role, b, iri, values)(config);
  /* check priority */
  const priorityA = confA.priority ? confA.priority : 0;
  const priorityB = confB.priority ? confB.priority : 0;
  const diff = priorityB - priorityA;
  if (diff !== 0) {
    return diff;
  }
  /* check predicate */
  return a - b;
};

/* fetching the class information and neighbourhood for this resource */
function fetch(id, iri, role, config = {}, dispatch) {
  return combineFetch([
    () => (dispatch(gatherClassInformation({ iri }))),
    () => (dispatch(fetchNeighbourhood({
      iri,
      role,
      config: {
        includedProperties: config && config.neighbourhood ? config.neighbourhood.include : null,
        excludedProperties: config && config.neighbourhood ? config.neighbourhood.exclude : null,
        provenance: config && config.provenance,
      },
      id,
    }))),
  ]);
}

/* checks whether the neighbourhood and class information has been loaded successfully */
function check(id) {
  return combineCheck([
    (values) => (values && values.classInfo && values.classInfo.status
      ? values.classInfo.status : {}),
    (values) => (values && values.neighbourhood && values.neighbourhood[id]
    && values.neighbourhood[id].status ? values.neighbourhood[id].status : {}),
  ]);
}

function NeighbourhoodListContent({
  id, iri, role, mode, reactorConfig, values, intl,
}) {
  const classes = neighbourhoodListStyles();
  const { neighbourhood } = values;
  if (neighbourhood && neighbourhood[id] && neighbourhood[id].props) {
    const predicates = Object.keys(neighbourhood[id].props);
    if (predicates && predicates.length > 0) {
      return (
        <Grid container spacing={1} className={classes.segmentGrid}>
          {predicates.sort(orderFn(reactorConfig, role, iri, values)).map((predicate) => (
            <Grid key={`property-row-${id}-${predicate}`} item xs={12}>
              <PropertyReactor
                role={role}
                mode={mode}
                predicate={predicate}
                objects={neighbourhood[id].props[predicate]}
                getReactorConfigEntry={getConfig(role, predicate, iri, values)}
                intl={intl}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
  }
  return null;
}

NeighbourhoodListContent.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  reactorConfig: PropTypes.instanceOf(Object).isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

function NeighbourhoodList(props) {
  const {
    id, iri, role, reactor, values, dispatch,
  } = props;

  return (
    <Relay
      component={NeighbourhoodListContent}
      componentProps={props}
      fetch={fetch(id, iri, role, reactor, dispatch)}
      check={check(id)}
      values={values}
    />
  );
}

NeighbourhoodList.defaultProps = {
  reactor: {},
  values: {},
};

NeighbourhoodList.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType,
  values: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapReactorConfig)(NeighbourhoodList);
