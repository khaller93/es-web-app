import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import EditIcon from "@material-ui/icons/Edit";

import version from "../../../version";
import Page from "../Page";
import AppBarSearchBar from "../../elements/search/appbar/AppBarSearchBar";
import {navigate} from "../../../history/navigation";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '32rem',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        marginTop: theme.spacing(5),
        textAlign: 'center'
    },
    versionSubtitle: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
    media: {
        height: '5rem',
        paddingBottom: '0.5rem',
    },
    sparqlEditIcon: {
        marginRight: theme.spacing(0.75)
    },
    treeViewIcon: {
        marginRight: theme.spacing(0.75)
    },
}));

const mapToProps = state => {
    return {
        role: state.app && state.app.role ? state.app.role : '_',
        appConfig: state.app.config,
    };
};

const AboutPage = ({appConfig, role, intl}) => {
    const classes = useStyles();

    /**
     * navigates to the corresponding SPARQL url.
     */
    const navigateToSPARQLEditor = () => {
        navigate('Explorer', {params: {method: 'sparql'}});
    };

    /**
     * navigates to the corresponding SPARQL url.
     */
    const navigateToTreeView = () => {
        navigate('Explorer', {params: {method: 'treeview'}});
    };

    const menus = [];
    if (appConfig && appConfig.enable) {
        if (appConfig.enable.sparql) {
            menus.push(<Button color="inherit" key="sparql-appbar-menu" onClick={navigateToSPARQLEditor}><EditIcon
                className={classes.sparqlEditIcon}/>SPARQL</Button>);
        }
        if (appConfig.enable.treeview) {
            menus.push(<Button color="inherit" key="treeview-appbar-menu" onClick={navigateToTreeView}><ListIcon
                className={classes.treeViewIcon}/><FormattedMessage id="app.menu.treeview"/></Button>);
        }

    }
    return (
        <Page menus={[<AppBarSearchBar key="app-bar-search-bar" intl={intl}/>, ...menus]}>
            <Container maxWidth="md">
                <Typography gutterBottom variant="h2" component="h1" className={classes.title}>
                    Exploratory Search System
                </Typography>
                <Typography gutterBottom variant="h5" component="p" color="secondary"
                            className={classes.versionSubtitle}>
                    <FormattedMessage id="app.about.version"/> {version}
                </Typography>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <img src="/tu-wien-logo.png" alt="TU Wien Logo" className={classes.media}/>
                            <Typography gutterBottom variant="h5" component="h2">
                                Information &amp; Software Engineering Group
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        </Page>
    );
};

export default connect(mapToProps)(AboutPage);