import React from "react";
import * as PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";


/* styles for the meta information bar */
const styles = makeStyles(() => ({
    metaInfo: {
        fontSize: '0.8em',
        marginLeft: '0.5em',
        color: 'grey'
    },
}));

/**
 * This React element is intended to provide meta information
 * about an undertaken search similar to major search engines
 * such as Google.
 *
 * @param total number of results that could be found.
 * @param timeInMs time that a search took in milliseconds.
 * @param intl internationalization object.
 */
const SearchResponseMetaInfo = ({total, timeInMs, intl}) => {

    const classes = styles();
    return (
        <Typography variant="body1" component="p" className={classes.metaInfo}>
            {intl.formatMessage({
                id: 'app.search.result.meta.info'
            }, {
                resultCount: total,
                time: timeInMs,
            })}
        </Typography>
    );
};

SearchResponseMetaInfo.propTypes = {
    total: PropTypes.number.isRequired,
    timeInMs: PropTypes.number.isRequired,
    intl: PropTypes.any.isRequired,
};

export default SearchResponseMetaInfo;