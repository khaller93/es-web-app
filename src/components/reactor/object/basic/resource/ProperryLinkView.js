import React from "react";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core";
import {getPathForExploration} from "../../../../../history/navigation";
import SearchState from "../../../../../models/state/SearchState";
import loadResourceDescription from "../../../utils/loadResourceDescription";
import {name} from "../../../../../models/rdf/resource";
import clsx from "clsx";
import intLabelInMap from "../../../../../configuration/intLabelInMap";

/* styles for the property links */
const styles = makeStyles(theme => ({
    propLink: {
        color: theme.palette.text.primary,
        textTransform: 'capitalize',
        fontWeight: 'bold',
    }
}));

const PropertyLinkView = ({role, iri, values, mode, names, supportedLanguages, descriptionConfig, props = {}, intl, dispatch}) => {
    loadResourceDescription({role, iri, values, supportedLanguages, descriptionConfig, dispatch});

    let label = intLabelInMap(names, intl);
    if (!label) {
        label = name(iri, values, intl);
    }
    const ResourceLink = React.forwardRef((props, ref) => (
        <RouterLink innerRef={ref} to={getPathForExploration(SearchState.of({
            role,
            searchText: label,
            selectedResource: iri,
        }))} {...props} />
    ));

    const classes = styles();
    props.className = clsx(props.className, classes.propLink);
    return (
        <Link component={ResourceLink} {...props}>
            {label}
        </Link>
    )
};

export default PropertyLinkView;