import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Grid from '@material-ui/core/Grid';
// ESS infobox sections
import ProvenanceTable from './sections/ProvenanceTable';
import SectionComponent from './sections/SectionComponent';
import MainSectionComponent from './sections/MainSectionComponent';
import SimilaritySection from './sections/SimilaritySection';
import ClassSampleComponent from './sections/ClassSampleComponent';
import HTMLSection from './sections/HTMLSection';
// class utils
import { resourceForInfobox } from '../../../configuration/reactorConfiguration';
// relay
import combineFetch from '../../../relay/combineFetch';
import Relay from '../../../relay/Relay';
// redux actions
import { gatherClassInformation } from '../../../actions/resources';
// types
import reactorConfigType from '../../../types/reactorConfig';
import defaultSection from './sections/utils/defaultSection';
// styles
import infoBoxStyles from './jss/infoBox';

/* map from configuration section name to JS React component */
const sectionMap = {
  ProvenanceTableSection: ProvenanceTable,
  SimilaritySection,
  ClassSampleSection: ClassSampleComponent,
  HTMLSection,
};

/* need to fetch class information for getting correct reactor configuration */
function fetch(iri, dispatch) {
  return combineFetch([
    () => dispatch(gatherClassInformation({ iri })),
  ]);
}

/* checks whether the class info has been loaded */
function check(values) {
  return (values && values.classInfo && values.classInfo.status ? values.classInfo.status : {});
}

/**
 * Content of the infobox.
 *
 * @param iri for which this box shall be assembled.
 * @param role active role.
 * @param mode 'view' or 'editing'.
 * @param values of the resource identified by given IRI.
 * @param reactorConfig configuration for reacting to resources.
 * @param intl internationalization object.
 * @param dispatch redux function for executing actions.
 */
function Comp({
  iri, role, mode, values, reactorConfig, dispatch, intl,
}) {
  const classes = infoBoxStyles();

  const boxConfig = resourceForInfobox(reactorConfig,
    iri,
    role,
    { classes: values.classInfo.all ? values.classInfo.all : [] });
  return (
    <Grid container className={classes.infoBox}>
      <Grid item xs={12} className={classes.section}>
        <MainSectionComponent
          iri={iri}
          intl={intl}
          mode={mode}
          values={values}
          role={role}
          reactorConfig={reactorConfig}
          reactor={boxConfig ? defaultSection(boxConfig.section) : null}
          dispatch={dispatch}
        />
      </Grid>
      {boxConfig && boxConfig.sections ? boxConfig.sections.filter((t) => t !== '__main__')
        .map((id) => {
          const sectionConfig = boxConfig.section[id];
          if (sectionConfig) {
            return (
              <Grid item xs={12} key={`info-section-${id}`} className={classes.section}>
                <SectionComponent
                  id={id}
                  iri={iri}
                  role={role}
                  mode={mode}
                  reactor={sectionConfig}
                  values={values}
                  sectionComponent={sectionMap[sectionConfig.sectionHandler]
                    ? sectionMap[sectionConfig.sectionHandler] : null}
                  dispatch={dispatch}
                  intl={intl}
                />
              </Grid>
            );
          }
          return null;
        }) : null}
    </Grid>
  );
}

Comp.defaultProps = {
  values: {},
  role: '_',
  mode: 'view',
  reactorConfig: {},
};

Comp.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string,
  mode: PropTypes.string,
  reactorConfig: reactorConfigType,
  values: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

/**
 * React element that assembles the info box for the given IRI.
 */
function InfoBoxWidget(props) {
  const {
    iri, values, dispatch,
  } = props;
  return (
    <Relay
      fetch={fetch(iri, dispatch)}
      check={check}
      values={values}
      component={Comp}
      componentProps={props}
    />
  );
}

InfoBoxWidget.defaultProps = {
  values: {},
};

InfoBoxWidget.propTypes = {
  iri: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

export default InfoBoxWidget;
