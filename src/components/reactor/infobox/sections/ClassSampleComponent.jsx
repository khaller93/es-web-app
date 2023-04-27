import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Grid from '@material-ui/core/Grid';
// ESS elements
import ResourceComponent from '../../object/basic/resource/ResourceComponent';
import ResourceCard from '../../object/basic/resource/ResourceCard';
// ESS sections
import BasicSectionComponent from './BasicSectionComponent';
// redux actions
import { gatherInstanceSamples } from '../../../../actions/resources';
// types
import sectionConfigType from '../../../../types/section/sectionConfig';

/* fetching a random sample of instances */
function fetch(iri, role, id, values, config, dispatch) {
  return () => (dispatch(gatherInstanceSamples({
    iri, role, id, config,
  })));
}

/* checks whether a random sample has been successfully loaded */
function check(id) {
  return (values) => (values && values.instance_sample && values.instance_sample[id]
  && values.instance_sample[id].status ? values.instance_sample[id].status : {});
}

/* checks whether this section has been configured correctly */
function isMisconfigured(sectionConfig) {
  return !(sectionConfig && sectionConfig.config && sectionConfig.config
    && sectionConfig.config.number);
}

/**
 * This section shows a sample of instances of a given class.
 *
 * @param id of this section.
 * @param role currently active role.
 * @param mode 'view' or 'edit'.
 * @param values for the class.
 * @param intl internationalization object.
 */
function ClassSampleComponentContent({
  id, role, mode, values, intl,
}) {
  return (
    <Grid container>
      {values.instance_sample[id].list && values.instance_sample[id].list.length > 0 ? (
        values.instance_sample[id].list.map((sampleIRI) => (
          <Grid item xs={3} key={`sample-${id}-${sampleIRI}`}>
            <ResourceComponent
              role={role}
              mode={mode}
              iri={sampleIRI}
              component={ResourceCard}
              componentProps={{ maxLength: 64 }}
              intl={intl}
            />
          </Grid>
        ))) : null}
    </Grid>
  );
}

ClassSampleComponentContent.defaultProps = {
  values: {},
};

ClassSampleComponentContent.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object),
  intl: PropTypes.instanceOf(Intl).isRequired,
};

/**
 * A component showing sample instances for a class.
 */
function ClassSampleComponent(props) {
  const {
    id, iri, role, reactor, values, dispatch,
  } = props;
  return (
    <BasicSectionComponent
      section={ClassSampleComponentContent}
      sectionProps={props}
      isMisconfigured={isMisconfigured(reactor)}
      fetch={fetch(iri, role, id, values, reactor.config, dispatch)}
      check={check(id)}
      values={values}
    />
  );
}

ClassSampleComponent.defaultProps = {
  reactor: {},
  values: {},
};

ClassSampleComponent.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType,
  values: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

export default ClassSampleComponent;
