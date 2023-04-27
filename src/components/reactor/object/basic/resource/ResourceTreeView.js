import React from "react";
import {getSpecificClasses, name} from "../../../../../models/rdf/resource";
import loadResourceDescription from "../../../utils/loadResourceDescription";
import loadClassInfo from "../../../utils/loadClassInfo";
import Typography from "@material-ui/core/Typography";
import ResourceComponent from "./ResourceComponent";
import BasicResourceLinkView from "./BasicResourceLinkView";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const styles = makeStyles(theme => ({
    resourceName: {
        marginRight: theme.spacing(2)
    },
    classSeparator: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
}));

/**
 * This React element displays a link for a given resource. The label of
 * this resource is used as text of the link and the link refers to
 * the search of this name using the search explorer.
 */
const ResourceTreeView = ({role, iri, values, mode, supportedLanguages, descriptionConfig, className, intl, dispatch}) => {
    loadResourceDescription({role, iri, values, supportedLanguages, descriptionConfig, dispatch});
    loadClassInfo({iri, values, dispatch});

    const label = name(iri, values, intl);
    const specificClasses = getSpecificClasses(values);

    const classes = styles();
    return (
        <React.Fragment>
            <Typography component="span" className={clsx(classes.resourceName, className)}>
                {label}
            </Typography>
            {specificClasses && specificClasses.length > 0 ? specificClasses.map((classIri, index) => {
                return <ResourceComponent key={'class-info-' + index} mode={mode} role={role} iri={classIri}
                                          component={BasicResourceLinkView} intl={intl}
                                          componentProps={{props: {color: 'secondary'}}}/>;
            }).reduce((prev, next) => [prev,
                <span className={classes.classSeparator}>-</span>, next]) : null}
        </React.Fragment>
    )
};

export default ResourceTreeView;