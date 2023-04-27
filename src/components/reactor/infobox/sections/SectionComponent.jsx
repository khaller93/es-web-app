import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// ESS elements
import InfoPopupIcon from '../../../elements/language/InfoPopupIcon';
// ESS utils
import intLabelInMap from '../../../../configuration/intLabelInMap';
// styles
import sectionComponentStyles from './jss/sectionComponent';
// types
import sectionConfigType from '../../../../types/section/sectionConfig';

/**
 * wraps the given section component and does common tasks such
 * that it has not been done by the passed section component.
 *
 * @param iri for which this section is intended.
 * @param role active role.
 * @param mode 'view' or 'edit'.
 * @param reactor configuration for this section.
 * @param sectionComponent the type of the section.
 * @param intl internationalization object.
 */
function SectionComponent({
  id, iri, role, mode, reactor, values, sectionComponent: Section, dispatch, intl,
}) {
  const label = intLabelInMap(reactor.name, intl);
  const classes = sectionComponentStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={reactor.expand}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          {label ? (
            <div className={classes.column}>
              <Typography component="span" className={classes.heading}>{label}</Typography>
            </div>
          ) : null}
          {reactor.hint ? <InfoPopupIcon infoMap={reactor.hint} intl={intl} /> : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Section ? (
            <Section {...{
              id, iri, role, mode, values, reactor, intl, dispatch,
            }}
            />
          ) : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>

  );
}

SectionComponent.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  sectionComponent: PropTypes.elementType.isRequired,
  reactor: sectionConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

export default SectionComponent;
