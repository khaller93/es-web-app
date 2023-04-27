import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Grid from '@material-ui/core/Grid';
// ESS basic section elements
import BasicSectionComponent from './BasicSectionComponent';
// ESS elements
import ResourceComponent from '../../object/basic/resource/ResourceComponent';
import ResourceCard from '../../object/basic/resource/ResourceCard';
// redux actions
import { fetchSimilarResources } from '../../../../actions/resources';
// types
import sectionConfigType from '../../../../types/section/sectionConfig';

/* fetching similar items */
function fetch(id, iri, role, values, config, dispatch) {
  return () => dispatch(fetchSimilarResources({
    iri, role, id, config,
  }));
}

/* checks whether similarity items has been loaded */
function check(id) {
  return (values) => (values && values.similarity && values.similarity[id]
  && values.similarity[id].status ? values.similarity[id].status : {});
}

/* checks whether the section is misconfigured */
function isMisconfigured(sectionConfig) {
  return !(sectionConfig && sectionConfig.config
    && sectionConfig.config && sectionConfig.config.ranking);
}

/**
 * A box element for displaying related items.
 *
 * @param id of this section.
 * @param iri for which this section is displayed.
 * @param role currently active role.
 * @param mode 'view' or 'edit'.
 * @param values for the resource
 * @param intl internationalization object.
 */
function SectionContent({
  id, role, mode, values, intl,
}) {
  return (
    <Grid container>
      {values.similarity[id].data && values.similarity[id].data.length > 0 ? (
        values.similarity[id].data.map((otherIRI) => (
          <Grid item xs={3} key={`sim-${id}-${otherIRI}`}>
            <ResourceComponent
              role={role}
              mode={mode}
              iri={otherIRI}
              component={ResourceCard}
              componentProps={{ maxLength: 64 }}
              intl={intl}
            />
          </Grid>
        ))) : null}
    </Grid>
  );
}

SectionContent.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

/**
 * A section displaying similarity items.
 */
function SimilaritySection(props) {
  const {
    id, iri, role, reactor: sectionConfig, values, dispatch,
  } = props;
  return (
    <BasicSectionComponent
      section={SectionContent}
      sectionProps={props}
      isMisconfigured={isMisconfigured(sectionConfig)}
      fetch={fetch(id, iri, role, values, sectionConfig.config, dispatch)}
      check={check(id)}
      values={values}
    />
  );
}

SimilaritySection.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default SimilaritySection;
