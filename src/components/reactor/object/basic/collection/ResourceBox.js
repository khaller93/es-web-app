import React from "react";
import Grid from "@material-ui/core/Grid";
import ResourceComponent from "../resource/ResourceComponent";
import ResourceCard from "../resource/ResourceCard";
import {makeStyles} from "@material-ui/core";

/* styles for  */
const styles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1)
    }
}));

/**
 *
 * @param role
 * @param mode
 * @param objects
 * @param getReactorConfigEntry
 * @param show
 * @param intl
 */
const ResourceBox = ({role, mode, objects, getReactorConfigEntry, config, intl}) => {

    const classes = styles();

    return <Grid container className={classes.root}>
        {objects.length > 0 ? (
            objects.slice(0,8).filter(o => o.type === 'iri').map(({value}, index) => (
                <Grid item xs={3} key={index}>
                    <ResourceComponent role={role} mode={mode} iri={value} component={ResourceCard}
                                       componentProps={{maxLength: 64}}
                                       intl={intl}/>
                </Grid>
            ))) : null}
    </Grid>
}

export default ResourceBox;