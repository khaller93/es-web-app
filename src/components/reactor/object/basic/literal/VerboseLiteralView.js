import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import PrefixResourceLinkView from "../resource/PrefixResourceLinkView";

/* styles for the literal view */
const styles = makeStyles(theme => ({
    datatype: {
        color: theme.palette.grey["500"],
        marginLeft: theme.spacing(0.5),
    },
    languageTag: {
        color: theme.palette.secondary.main,
    }
}));

/**
 * This React element displays a given literal and all its technical details, including the
 * datatype and language tag.
 */
const VerboseLiteralView = ({role, mode, value, datatypeIRI, languageTag, intl}) => {

    const classes = styles();
    return (
        <Typography component="p">
            {value}
            {(datatypeIRI ? <sup className={classes.datatype}><PrefixResourceLinkView iri={datatypeIRI} role={role} mode={mode} props={{className: classes.datatype}} intl={intl}/></sup> : null)}
            {(languageTag ? <span className={classes.languageTag}>@{languageTag}</span> : null)}
        </Typography>
    );
};

export default VerboseLiteralView;