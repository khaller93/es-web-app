import React from "react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import intLabelInMap from "../../../../configuration/intLabelInMap";
import RDFTermReactor from "../../../reactor/object/RDFTermReactor";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline'
    },
    predicateChip: {
        marginRight: theme.spacing(0.5)
    }
}));

/**
 * function to render the options. only up to three options
 * are displayed, '...' will ne rendered to indicates that
 * there are more than three options, if that is the case.
 */
const optionsDisplay = (role, predicate, selection, intl) => {
    if (selection) {
        if (selection.length === 1) {
            return <RDFTermReactor key={`selection-chip-${predicate.id}-0`}
                                   mode="view" role={role} term={selection[0]} getReactorConfigEntry={(config) => config}
                                   intl={intl}/>
        } else {
            return <span>
                {selection.list.slice(0, 3).map((s, index) => {
                    return <RDFTermReactor key={`selection-chip-${predicate.id}-${index}`}
                                           mode="view" role={role} term={s} getReactorConfigEntry={(config) => config}
                                           intl={intl}/>;
                }).reduce((a, b) => <span key={a.key + '-plus-' + b.key}>{a}, {b}</span>)}
                <Typography component="span">{selection.list.length > 3 ? ', ...' : ''}</Typography>
            </span>;
        }
    }
    return null;
};

/**
 * A chip that render options.
 *
 * @param role that is currently active.
 * @param predicate for which the selection shall be displayed.
 * @param selection that shall be displayed.
 * @param onClick optional function that is called, when
 * a chip is clicked.
 * @param onSelectionDelete optional function that is called, when
 * a deletion of the section has been requested.
 * @param intl internationalization object.
 */
const OrSelectionChip = ({role, predicate, selection, onClick, onSelectionDelete, intl}) => {
    const classes = useStyles();

    if (selection && selection.list && selection.list.length > 0) {

        /**
         * handle the click of this chip.
         */
        const handleOnClicked = () => {
            if (onClick) {
                onClick(predicate);
            }
        };

        /**
         * handle the request of deleting the selection of this predicate.
         */
        const handleOnDeleteClicked = () => {
            if (onSelectionDelete) {
                onSelectionDelete(predicate);
            }
        };

        // label of the predicate for the chip
        let predicateLabel = intLabelInMap(predicate.name, intl);
        if (!predicateLabel) {
            predicateLabel = '-';
        }
        // label element
        const label = <div className={classes.root}>
            <Typography component="span" className={classes.predicateChip}>{predicateLabel}:</Typography>
            {optionsDisplay(role, predicate, selection, intl)}
        </div>;

        return <Chip label={label} clickable variant="outlined" onClick={handleOnClicked}
                     onDelete={handleOnDeleteClicked} color="primary"/>;
    }
    return null;
};

export default OrSelectionChip;