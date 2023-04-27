import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import intLabelInMap from "../../../configuration/intLabelInMap";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey["50"],
    },
    selectionBar: {
        flexGrow: 1,
        display: 'flex',
        minHeight: '15rem',
    },
    selectionBarTabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    selectionBox: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    searchBar: {
        paddingLeft: theme.spacing(2),
        backgroundColor: theme.palette.common.white,
        width: '100%'
    }
}));

/**
 * gets a comparison function that can be handed to the sort function
 * of arrays.
 *
 * It compares two objects based on their priority field. Should
 * there be no priority field, then 0 is assumed per default.
 *
 * If two objects have the same priority, then the name labels
 * in the given locale are compared with each other.
 *
 * @param intl that shall be used to get the correct labels.
 * @returns {function(...[*]=)} comparison function that can be
 * handed to the sort function of arrays.
 */
const orderFn = intl => (a, b) => {
    const priorityA = a.priority ? a.priority : 0;
    const priorityB = b.priority ? b.priority : 0;
    const diff = priorityA - priorityB;
    if (diff === 0) {
        let nameA = intLabelInMap(a.name, intl);
        if (!nameA) {
            nameA = '-';
        }
        let nameB = intLabelInMap(b.name, intl);
        if (!nameB) {
            nameB = '-';
        }
        return nameA - nameB;
    }
    return diff;
};

/**
 * extracts the predicate map from the given configuration.
 *
 * @param config from which the predicate map shall be extracted.
 * @returns {{}} the predicate map from the given configuration.
 */
const getPredicateMap = (config) => {
    const predicateMap = {};
    if (config.facets) {
        const facetKeys = Object.keys(config.facets);
        for (let i = 0; i < facetKeys.length; i++) {
            const currentFacet = {...config.facets[facetKeys[i]], id: facetKeys[i]};
            const sections = currentFacet.sections ? currentFacet.sections : ['general'];
            for (let n = 0; n < sections.length; n++) {
                if (!predicateMap[sections[n]]) {
                    predicateMap[sections[n]] = [currentFacet];
                } else {
                    predicateMap[sections[n]].push(currentFacet);
                }
            }
        }
    }
    return predicateMap;
};

/**
 * Section panel for a certain section in which all the corresponding
 * predicates are listed.
 *
 * @param tabValue the currently activated section panel.
 * @param index for this section panel.
 * @param predicates that shall be listed in this section panel.
 * @param enablePredicates a map having information about enabled predicates.
 * @param onChange function to collect events that occur when a predicate
 * gets selected or unselected.
 * @param intl internationalization object.
 */
const TabSectionPredicatePanel = ({tabValue, index, predicates, enablePredicates, onChange, intl}) => {

    /**
     * creates a handle function for selection changes for the given
     * predicate, which are then passed on.
     *
     * @param predicate for which a handling function shall be creates.
     * @returns {function(...[*]=)} handling function.
     */
    const handleCheckBoxChange = (predicate) => (event, checked) => {
        if (onChange) {
            onChange(predicate, checked);
        }
    };

    return tabValue === index ? (
        <FormControl component="fieldset" id={`facet-section-panel-${index}`}
                     aria-labelledby={`facet-vertical-tab-${index}`}>
            <FormGroup>
                {predicates ? predicates.map((predicate, pIndex) => (
                    <FormControlLabel
                        key={`predicate-checkbox-${pIndex}-selection-${index}`}
                        control={
                            <Checkbox name={predicate.id} onChange={handleCheckBoxChange(predicate)}
                                      checked={!!(enablePredicates && enablePredicates[predicate.id])}/>
                        }
                        label={intLabelInMap(predicate.name, intl)}
                    />
                )) : null}
            </FormGroup>
        </FormControl>
    ) : null;
};

const countEnabledPredicates = (enablePredicates, predicates) => {
    return [...predicates.filter(p => !!enablePredicates[p.id])].length;
};

/**
 * A box that displays all possible facet predicates for selection.
 *
 * @param className that shall be placed on the root element.
 * @param enablePredicates a map with information whether a predicate is enabled.
 * @param onChange function that is called, if a selection change happens.
 * @param config for the facet configuration.
 * @param intl internationalization object.
 */
const FacetSelectionBox = ({className, enablePredicates, onChange, config, intl}) => {
    const classes = useStyles();

    const [tabIndex, setTabIndex] = React.useState(0);

    // prepare the facets for selection bar.
    const predicateMap = getPredicateMap(config);
    let sectionObjs = config.sections ? config.sections.map(section => {
        return {...config.section[section], id: section}
    }).filter(obj => !!obj).sort(orderFn(intl)) : null;
    if ('general' in predicateMap) {
        sectionObjs = [{id: 'general'}, ...sectionObjs];
    }

    /**
     * handles the change of the selection in the vertical bar.
     *
     * @param event of the selection change.
     * @param newValue the new index that has been selected.
     */
    const handleTabIndexChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return <Paper variant="outlined" square className={clsx(classes.root, className)}>
        {sectionObjs && sectionObjs.length > 0 ? (
            <div className={classes.selectionBar}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabIndexChange}
                    orientation="vertical"
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    className={classes.selectionBarTabs}
                >
                    {sectionObjs.map((section, index) => {
                        if (section.id === 'general') {
                            const label = intl.formatMessage({id: 'app.facet.filter.selection.general'});
                            const count = countEnabledPredicates(enablePredicates, predicateMap['general']);
                            return <Tab label={count > 0 ?
                                <Badge badgeContent={count} color="secondary">{label} </Badge> : label}
                                        id={`facet-vertical-tab-${index}`} tabIndex={index}
                                        aria-controls={`facet-section-panel-${index}`}
                                        key={`facet-vertical-tab-${index}`}/>;
                        } else {
                            const label = section.name ? intLabelInMap(section.name, intl) : '-';
                            const count = countEnabledPredicates(enablePredicates, predicateMap[section.id]);
                            return <Tab label={count > 0 ?
                                <Badge badgeContent={count} color="secondary">{label}</Badge> : label}
                                        id={`facet-vertical-tab-${index}`}
                                        tabIndex={index}
                                        aria-controls={`facet-section-panel-${index}`}
                                        key={`facet-vertical-tab-${index}`}/>;
                        }
                    })}
                </Tabs>
                <div className={classes.selectionBox}>
                    {sectionObjs.map((section, index) => (
                        <TabSectionPredicatePanel tabValue={tabIndex} index={index} key={`facet-section-panel-${index}`}
                                                  onChange={onChange} predicates={predicateMap[section.id]}
                                                  enablePredicates={enablePredicates}
                                                  intl={intl}/>
                    ))}
                </div>
            </div>
        ) : null}
    </Paper>;
};

FacetSelectionBox.propTypes = {
    className: PropTypes.string,
    enablePredicates: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    config: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
};

export default FacetSelectionBox;