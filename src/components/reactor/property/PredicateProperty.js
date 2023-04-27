import React from "react";
import {makeStyles} from "@material-ui/core";
import ResourceComponent from "../object/basic/resource/ResourceComponent";
import PropertyLinkView from "../object/basic/resource/ProperryLinkView";
import RDFTermCollectionReactor from "../object/RDFTermCollectionReactor";

/* styles for the main section */
const useStyles = makeStyles(theme => ({
    segmentTitle: {
        marginRight: theme.spacing(1.5)
    },
    segmentGrid: {
        margin: theme.spacing(2)
    }
}));

const getConf = (getReactorConfigEntry) => (config) => {
    const xConf = getReactorConfigEntry(config);
    if (xConf) {
        return xConf.collection ? xConf.collection : {};
    }
    return {};
}

/**
 *
 */
const BasicPredicate = ({role, mode, predicate, objects, config, getReactorConfigEntry, intl}) => {
    const classes = useStyles();
    return <React.Fragment>
        <span className={classes.segmentTitle}>
            <ResourceComponent component={PropertyLinkView} mode={mode} iri={predicate} role={role}
                               intl={intl} componentProps={config ? {names: config.name} : {}}/>:
        </span>
        <RDFTermCollectionReactor mode={mode} role={role} intl={intl} objects={objects}
                                  getReactorConfigEntry={getConf(getReactorConfigEntry)}/>
    </React.Fragment>
};

export default BasicPredicate;