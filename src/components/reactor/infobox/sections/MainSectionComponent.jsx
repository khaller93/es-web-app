import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
// material ui components
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// ESS components
import PropertiesList from '../NeighbourhoodList';
import ResourceComponent from '../../object/basic/resource/ResourceComponent';
import BasicResourceLinkView from '../../object/basic/resource/BasicResourceLinkView';
// utils
import {
  depictions,
  description,
  getSpecificClasses,
  name,
} from '../../../../models/rdf/resource';
// styles
import mainSectionStyles from './jss/mainSection';
import { gatherResourceDescription } from '../../../../actions/resources';
import Relay from '../../../../relay/Relay';
// types
import reactorConfigType from '../../../../types/reactorConfig';
import sectionConfigType from '../../../../types/section/sectionConfig';

/* maps supported languages to this section */
const mapToProps = (state) => ({
  supportedLanguages: state.app.supported_languages ? state.app.supported_languages : [],
  reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
});

/* need to fetch description for main section */
function fetch(iri, role, descriptionConfig, supportedLanguages, dispatch) {
  return () => {
    dispatch(gatherResourceDescription({
      iri, role, descriptionConfig, supportedLanguages,
    }));
  };
}

/* checks whether description has been loaded */
function check(values) {
  return values && values.description && values.description.status ? values.description.status : {};
}

/**
 * Content for the main section.
 *
 * @param iri for which this section is displayed.
 * @param role currently active role.
 * @param mode 'view' or 'edit'.
 * @param reactor configuration for this section.
 * @param values for the resource
 * @param supportedLanguages languages supported by this app.
 * @param intl internationalization object.
 */
function Comp({
  iri, role, mode, reactor, reactorConfig, values, intl,
}) {
  const classes = mainSectionStyles();

  const label = name(iri, values, intl);
  const desc = description(values, intl);
  const depicts = depictions(values);
  const specificClasses = getSpecificClasses(values);

  return (
    <Card>
      <div className={classes.cardHead}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {label}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {specificClasses && specificClasses.length > 0 ? specificClasses.map((classIri) => (
                <ResourceComponent
                  key={`class-info-${classIri}`}
                  mode={mode}
                  role={role}
                  iri={classIri}
                  component={BasicResourceLinkView}
                  intl={intl}
                  componentProps={{ props: { color: 'secondary' } }}
                />
              )).reduce((prev, next) => [prev,
                <span
                  key={`${prev.key}-span-${next.key}`}
                  className={classes.classSeparator}
                >
                  -
                </span>, next]) : null}
            </Typography>
            <Typography component="p" className={classes.boxDescription}>
              {desc || <FormattedMessage id="app.resource.no-description" />}
            </Typography>
          </CardContent>
        </div>
        {depicts ? <img className={classes.gallery} src={depicts[0]} alt={label} /> : null}
      </div>
      <PropertiesList
        id="__main__"
        iri={iri}
        role={role}
        mode={mode}
        values={values}
        reactor={reactor}
        reactorConfig={reactorConfig}
        intl={intl}
      />
    </Card>
  );
}

Comp.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  reactor: sectionConfigType.isRequired,
  reactorConfig: reactorConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

/**
 * This React element is intended to be displayed as mains section
 * at the top of the infobox.
 */
const MainSectionComponent = (props) => {
  const {
    iri, role, reactor, values, supportedLanguages, dispatch,
  } = props;
  return (
    <Relay
      fetch={fetch(iri, role, reactor ? reactor.config : {}, supportedLanguages, dispatch)}
      check={check}
      values={values}
      component={Comp}
      componentProps={props}
    />
  );
};

MainSectionComponent.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  supportedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapToProps)(MainSectionComponent);
