import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
// material ui components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// ESS elements
import ResourceComponent from './ResourceComponent';
import BasicResourceLinkView from './BasicResourceLinkView';
// relay
import Relay from '../../../../../relay/Relay';
import combineFetch from '../../../../../relay/combineFetch';
import combineCheck from '../../../../../relay/cpmbineCheck';
// ESS models
import SearchState from '../../../../../models/state/SearchState';
import {
  depictions,
  description,
  getSpecificClasses,
  name,
} from '../../../../../models/rdf/resource';
// redux actions
import {
  gatherClassInformation,
  gatherResourceDescription,
} from '../../../../../actions/resources';
// navigation
import { navigateToExploration } from '../../../../../history/navigation';
// styles
import resourceCardStyles from './jss/resourceCard';

function ResourceCardContent({
  role, iri, values, mode, maxLength, intl,
}) {
  const label = name(iri, values, intl);
  let desc = description(values, intl);
  const depicts = depictions(values);
  const specificClasses = getSpecificClasses(values);

  if (desc && desc.length > 0 && maxLength) {
    if (desc.length > maxLength) {
      desc = `${desc.slice(0, maxLength)} ...`;
    }
  }

  const handleClick = () => {
    navigateToExploration(SearchState.of({ role, searchText: label, selectedResource: iri }));
  };

  const classes = resourceCardStyles();
  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        {depicts ? (
          <CardMedia
            className={classes.media}
            image={depicts[0]}
            title={label}
          />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {label}
          </Typography>
          <Typography variant="body2" color="secondary">
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
                key={`${prev.key}-s-${next.key}`}
                className={classes.classSeparator}
              >
                -
              </span>, next]) : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc || (
              <span style={{ color: 'grey' }}>
                <FormattedMessage
                  id="app.resource.no-description"
                />
              </span>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ResourceCardContent.defaultProps = {
  values: {},
  maxLength: 256,
};

ResourceCardContent.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object),
  maxLength: PropTypes.number,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

function fetch(role, iri, values, supportedLanguages, descriptionConfig, dispatch) {
  return combineFetch([
    () => (dispatch(gatherResourceDescription({
      iri, role, descriptionConfig, supportedLanguages,
    }))),
    () => (dispatch(gatherClassInformation({ iri }))),
  ]);
}

const check = combineCheck([
  (values) => (values && values.description && values.description.status
    ? values.description.status : {}),
  (values) => (values && values.classInfo && values.classInfo.status
    ? values.classInfo.status : {}),
]);

/**
 *
 */
const ResourceCard = (props) => {
  const {
    role, iri, values, supportedLanguages, descriptionConfig, dispatch,
  } = props;
  return (
    <Relay
      component={ResourceCardContent}
      componentProps={props}
      fetch={fetch(role, iri, values, supportedLanguages, descriptionConfig, dispatch)}
      check={check}
      values={values}
    />
  );
};

ResourceCard.defaultProps = {
  values: {},
  descriptionConfig: {},
};

ResourceCard.propTypes = {
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object),
  supportedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  descriptionConfig: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func.isRequired,
};

export default ResourceCard;
