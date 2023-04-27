import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import BasicResourceLinkView from "./resource/BasicResourceLinkView";
import ResourceComponent from "./resource/ResourceComponent";
import clsx from "clsx";
import {FormattedMessage} from "react-intl";
import loadResourceDescription from "../../utils/loadResourceDescription";
import {name, description, depictions, getSpecificClasses} from '../../../../models/rdf/resource';

/* styles for  */
const styles = makeStyles(theme => ({
    snippetCard: {
        border: 'none',
        boxShadow: 'unset',
    },
    abstractBox: {
        display: 'flex',
        '& > img': {
            marginRight: theme.spacing(1.5),
            maxWidth: '20%',
            height: '5em',
        }
    },
    classSeparator: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    }
}));

/**
 * This element represents a snippet that can be displayed in result list, neighbourhood
 * or recommendation boxes.
 *
 *
 * @param value
 * @param mode
 * @param intl
 * @return {*}
 */
const SESnippetView = ({role, iri, values, mode, supportedLanguages, descriptionConfig, maxLength, dispatch, className, intl}) => {
    loadResourceDescription({role, iri, values, supportedLanguages, descriptionConfig, dispatch});

    const classes = styles();
    const label = name(iri, values, intl);
    let desc = description(values, intl);
    const depicts = depictions(values);
    const specificClasses = getSpecificClasses(values);
    const rootClassName = clsx(className, classes.snippetCard);

    if (desc && desc.length > 0 && maxLength) {
        if (desc.length > maxLength) {
            desc = desc.slice(0, maxLength) + ' ...';
        }
    }

    return (
        <Card className={rootClassName}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    <ResourceComponent role={role} iri={iri} mode="view" component={BasicResourceLinkView} intl={intl}/>
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                    {specificClasses && specificClasses.length > 0 ? specificClasses.map((classIri, index) => {
                        return <ResourceComponent key={'class-info-' + index} mode="view" role={role} iri={classIri}
                                                  component={BasicResourceLinkView} intl={intl}
                                                  componentProps={{props: {color: 'secondary'}}}/>;
                    }).reduce((prev, next) => [prev, <span key={prev.key + '-span-' + next.key}
                                                           className={classes.classSeparator}>-</span>, next]) : null}
                </Typography>
                <div className={classes.abstractBox}>
                    {depicts && depicts.length > 0 ? <img src={depicts[0]} alt={label}/> : null}
                    <Typography component="p" className={classes.content}>
                        {desc ? desc :
                            <span style={{color: 'grey'}}><FormattedMessage id="app.resource.no-description"/></span>}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default SESnippetView;