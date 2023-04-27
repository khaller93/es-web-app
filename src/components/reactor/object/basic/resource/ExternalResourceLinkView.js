import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import {name} from "../../../../../models/rdf/resource";
import loadResourceDescription from "../../../utils/loadResourceDescription";

const useStyles = makeStyles(theme => ({
    link: {
        color: green['500']
    }
}));

/**
 * This React element displays a link for a given resource.
 */
const ExternalResourceLinkView = ({role, iri, values, mode, supportedLanguages, descriptionConfig, props, intl, dispatch}) => {
    const classes = useStyles();

    loadResourceDescription({role, iri, values, supportedLanguages, descriptionConfig, dispatch});

    const label = name(iri, values, intl);
    return (
        <Link href={iri} target="_blank" className={classes.link} {...props}>
            {label && label.length > 0 ? label : iri}
        </Link>
    )
};

export default ExternalResourceLinkView;