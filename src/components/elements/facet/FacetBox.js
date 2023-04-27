import React from 'react';
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from "@material-ui/core/IconButton";
import FacetSelectionBox from "./FacetSelectionBox";
import FacetWidgetBox from "./FacetWidgetBox";
import SelectionBarBox from "./SelectionBarBox";
import loadFacetPredicateDetails from "./utils/loadFacetPredicateDetails";
import {changeFacetSelection, deleteFacetSelection, enableFacetPredicate} from "../../../actions/facet";
import roleSpecificEntryInMap from "../../../configuration/utils/roleSpecificEntryInMap";

const styles = makeStyles((theme) => ({
    panel: {
        paddingLeft: theme.spacing(1)
    },
    bar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}));

const mapToProps = state => {
    const role = state.app && state.app.role ? state.app.role : '_';
    const explorationState = state.explorer ? state.explorer.state : null;
    return {
        explorationState: explorationState,
        enabledPredicates: state.facet ? state.facet.enabled : {},
        details: state.facet ? roleSpecificEntryInMap(state.facet.details, role) : {},
    }
};

/**
 * extracts the list of enabled facet predicates from the given `enabledPredicates` map.
 *
 * @param enabledPredicates a map containing information which predicates shall be enabled.
 * @param config general configuration for facets.
 * @returns {[]} the list of enabled facet predicates from the given `enabledPredicates` map.
 */
const getEnabledPredicateList = (enabledPredicates, config) => {
    const predicateList = [];
    if (enabledPredicates && config && config.facets) {
        const predicateIDs = Object.keys(enabledPredicates);
        for (let i = 0; i < predicateIDs.length; i++) {
            if (enabledPredicates[predicateIDs[i]]) {
                predicateList.push({...config.facets[predicateIDs[i]], id: predicateIDs[i]});
            }
        }
    }
    return predicateList;
};

/**
 *
 * @param config
 * @returns {[]}
 */
const getAllPredicateList = (config) => {
    const predicateList = [];
    if (config && config.facets) {
        const predicateIDs = Object.keys(config.facets);
        for (let i = 0; i < predicateIDs.length; i++) {
            predicateList.push({...config.facets[predicateIDs[i]], id: predicateIDs[i]});
        }
    }
    return predicateList;
};

/**
 * A box that maintains all user elements needed for employing facets.
 *
 * @param role that is currently activated.
 * @param explorationState
 * @param className that shall be placed on the root element.
 * @param details
 * @param enabledPredicates a map containing information which facet predicates
 * shall be enabled.
 * @param config general configuration for facets.
 * @param intl internationalization object.
 * @param dispatch function
 */
const FacetBox = ({role, explorationState, className, details, enabledPredicates, config, intl, dispatch}) => {
    const classes = styles();

    const [activated, setActivated] = React.useState(false);

    /**
     * handles the change of selection for the given predicate.
     *
     * @param predicate of the change.
     * @param selectionFunction function applying the change.
     */
    const handleSelectionChange = (predicate, selectionFunction) => {
        dispatch(changeFacetSelection(explorationState, role, predicate, selectionFunction));
    };

    /**
     * handles the deletion of a selection for a certain predicate.
     *
     * @param predicate for which the deletion of the selection has been requested.
     */
    const handleSelectionDeletion = (predicate) => {
        dispatch(deleteFacetSelection(explorationState, role, predicate));
    }

    /**
     * handles the facet collection in the vertical selection box.
     *
     * @param predicate for which the selection has changed.
     * @param activated true, if predicted is now selected, or otherwise false.
     */
    const handleFacetSelectionChange = (predicate, activated) => {
        dispatch(enableFacetPredicate(predicate, activated));
    };

    /**
     * handles the closure of a facet widget of a certain predicate.
     *
     * @param predicate for which the facet widget has been closed.
     */
    const handleFacetWidgetClose = (predicate) => {
        dispatch(enableFacetPredicate(predicate, false));
    };

    const allPredicateList = getAllPredicateList(config);

    const enabledPredicateList = getEnabledPredicateList(enabledPredicates, config);
    if (enabledPredicateList && enabledPredicateList.length > 0) {
        loadFacetPredicateDetails({explorationState, role, predicateList: enabledPredicateList, details, dispatch});
    }

    return config ? (
        <Grid container className={clsx(classes.panel, className)} spacing={1}>
            <Grid item xs={2}>
                <Button color="primary" onClick={() => setActivated(!activated)}>
                    <FormattedMessage id="app.facet.filter.title"/>
                </Button>
                {activated ? (
                    <IconButton color="primary"
                                aria-label={intl.formatMessage({id: "app.facet.filter.aria.label.show-less"})}
                                onClick={() => setActivated(false)}>
                        <ExpandMoreIcon/>
                    </IconButton>
                ) : (
                    <IconButton color="primary" aria-label={intl.formatMessage({id: "app.facet.filter.aria.label"})}
                                onClick={() => setActivated(true)}>
                        <ExpandLessIcon/>
                    </IconButton>
                )}
            </Grid>
            <Grid item xs={10} className={classes.bar}>
                <SelectionBarBox role={role} predicateList={allPredicateList}
                                 onSelectionDelete={handleSelectionDeletion}
                                 valueMap={details && details['all'] ? details['all'] : {}} intl={intl}/>
            </Grid>
            <Grid item xs={4}>
                {activated ?
                    <FacetSelectionBox role={role} enablePredicates={enabledPredicates ? enabledPredicates : {}}
                                       config={config}
                                       onChange={handleFacetSelectionChange} intl={intl}/> : null}
            </Grid>
            <Grid item xs={8}>
                {activated ? <FacetWidgetBox role={role} predicateList={enabledPredicateList}
                                             valueMap={details && details['all'] ? details['all'] : {}}
                                             onChange={handleSelectionChange}
                                             onClose={handleFacetWidgetClose}
                                             intl={intl}/> : null}
            </Grid>
        </Grid>
    ) : null;
};

export default connect(mapToProps)(FacetBox);