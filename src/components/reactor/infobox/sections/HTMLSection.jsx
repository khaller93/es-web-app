import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// ESS sections
import BasicSectionComponent from './BasicSectionComponent';
// redux actions
import { fetchNeighbourhood } from '../../../../actions/resources';
// types
import sectionConfigType from '../../../../types/section/sectionConfig';

/* fetching the neighbourhood */
function fetch(id, iri, role, config, dispatch) {
  return () => (dispatch(fetchNeighbourhood({
    iri,
    role,
    config: {
      includedProperties: config.neighbourhood.include,
      excludedProperties: config.neighbourhood.exclude,
      provenance: config.provenance,
    },
    id,
  })));
}

/* checks whether  */
function check(id) {
  return (values) => (values && values.neighbourhood && values.neighbourhood[id]
  && values.neighbourhood[id].status ? values.neighbourhood[id].status : {});
}

/* checks whether the section is misconfigured */
function isMisconfigured(sectionConfig) {
  return !(sectionConfig && sectionConfig.config && sectionConfig.config
    && sectionConfig.config.property);
}

/**
 * A box element for displaying html.
 *
 * @param id of this section.
 * @param iri for which this section is displayed.
 * @param role currently active role.
 * @param mode 'view' or 'edit'.
 * @param reactor configuration for this section.
 * @param values for the resource
 * @param dispatch function for executing actions.
 * @param intl internationalization object.
 */
function HTMLSectionContent({
  id, reactor, values,
}) {
  let section = <Typography>no entry</Typography>;
  if (values.neighbourhood && values.neighbourhood[id] && values.neighbourhood[id].props
    && values.neighbourhood[id].props[reactor.config.property]) {
    const objects = values.neighbourhood[id].props[reactor.config.property];
    section = (
      <Grid container>
        {objects && objects.length > 0
          ? <div className="content" dangerouslySetInnerHTML={{ __html: objects[0].value }} />
          : <Typography>no entry</Typography>}
      </Grid>
    );
  }
  return section;
}

/**
 * A HTML section that is displaying a given HTML code. It is not
 * safe (e.g. cross-site scripting) and should be used cautiously.
 */
const HTMLSection = (props) => {
  const {
    id, iri, role, reactor, values, dispatch,
  } = props;
  return (
    <BasicSectionComponent
      section={HTMLSectionContent}
      sectionProps={props}
      isMisconfigured={isMisconfigured(reactor)}
      fetch={fetch(id, iri, role, {
        neighbourhood: {
          include: [reactor.config.property],
        },
      },
      dispatch)}
      check={check(id)}
      values={values}
    />
  );
};

HTMLSection.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default HTMLSection;
