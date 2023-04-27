import React from 'react';
import clsx from 'clsx';
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import {green} from '@material-ui/core/colors';
import {FormattedMessage} from "react-intl";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


/* style for the displayed  message */
const styles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        color: theme.palette.common.white,
    },
    messageBox: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: '4px',
        textAlign: 'center',
        textTransform: 'uppercase',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
}));

/**
 * This React element is intended to show the result of
 * an ASK SPARQL query.
 *
 * @param value a bolean value (true or false).
 */
const AskResultField = ({value}) => {
    const classes = styles();
    return value !== undefined && value !== null ? (
        <Box className={clsx(classes.messageBox, value ? classes.success : classes.error)}>
            <span id="sparql-ask-result" className={classes.message}>
                <Typography variant="h1" component="p">
                    {value ? <FormattedMessage id="app.sparql.ask.true"/> :
                        <FormattedMessage id="app.sparql.ask.false"/>}
                </Typography>
            </span>
        </Box>
    ) : null;
};

AskResultField.propTypes = {
    value: PropTypes.bool.isRequired,
};

export default AskResultField;