import React from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import {makeStyles, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: theme.spacing(25),
        overflow: 'auto',
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

/**
 *
 * @param value
 * @param selection
 * @param onClicked
 * @param intl internationalization object.
 */
const LiteralChip = ({value, selection, onClicked, intl}) => {
    if (value.term && (!value.term['xml:lang'] || value.term['xml:lang'] === intl.locale)) {

        const selected = selection && selection.list && selection.list.includes(value.term);

        const handleClick = () => {
            if (onClicked) {
                onClicked(value.term, !selected);
            }
        };

        return <Chip clickable variant={selected ? 'default' : 'outlined'}
                     color={selected ? 'primary' : 'default'}
                     label={<Typography component="p">{value.term.value} ({value.total})</Typography>}
                     onClick={handleClick}
        />;
    }
    return null;
};

/**
 * creates a function that applies the given change on the selection object.
 *
 * @param term that has been selected/unselected.
 * @param activate true, if the term shall be selected, or false, if unselected.
 * @returns {function(...[*]=)} that applies the change on the current selection.
 */
const selectionChange = (term, activate) => (object) => {
    if (object && !object.selection) {
        object.selection = {
            type: 'or',
            list: [],
        };
    }
    if (activate) {
        if (!object.selection.list.includes(term)) {
            object.selection.list = [...object.selection.list, term];
        }
    } else {
        if (object.selection.list.includes(term)) {
            object.selection.list = [...object.selection.list.filter(t => t !== term)];
        }
    }
};

/**
 *
 * @param role
 * @param predicate
 * @param values
 * @param onChange
 * @param intl
 */
const OptionWidget = ({role, predicate, values, onChange, intl}) => {
    const classes = useStyles();

    /**
     * handles the click on a term.
     *
     * @param term that has been selected/unselected.
     * @param activate true, if the term shall be selected, or false, if unselected.
     */
    const handleClick = (term, activate) => {
        onChange(predicate, selectionChange(term, activate));
    };

    return <Box className={classes.root}>
        {values && values.list && values.list.length > 0 ? values.list.map((value, index) => {
            switch (value.term.type) {
                case 'literal':
                    return <LiteralChip key={`facet-${predicate.id.toLowerCase()}-chip-${index}`}
                                        selection={values.selection}
                                        role={role} value={value} onClicked={handleClick} intl={intl}/>;
                case 'iri':

                default:
                    return null;
            }
        }) : null}
    </Box>
};


export default OptionWidget;