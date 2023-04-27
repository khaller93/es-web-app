import React from "react";
// internationalization
import {FormattedMessage} from "react-intl";
// material ui components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";

import {navigate} from "../../history/navigation";
import Page from "./Page";
import {resolve} from "../../configuration";

const styles = makeStyles((theme) => ({
    'errorContainer': {
        marginTop: 'calc(50vh - 6em)',
        transform: 'translate(0%, -50%)'
    },
    'notFoundMessage': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    'notFoundIconContainer': {
        textAlign: 'center'
    },
    'notFoundIcon': {
        maxWidth: '100%',
        height: '100%'
    }
}));

/**
 * This React component is intended to be displayed as a 404 not found page.
 */
const PathNotFoundPage = () => {

    const classes = styles();
    return (
        <Page>
            <CssBaseline/>
            <Container className={classes.errorContainer}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h1" component="h1">
                            <FormattedMessage id="app.404.ooops" defaultMessage="Ooops..."/>
                        </Typography>
                        <Typography className={classes.notFoundMessage} variant="h4" component="p">
                            <FormattedMessage id="app.404.message"
                                              defaultMessage="Sorry, we can't find the page you are looking for."/>
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={() => navigate('Home')}>
                            <FormattedMessage id="app.404.goback" defaultMessage="Go back"/>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.notFoundIconContainer}>
                        {/* Icon made by Freepik from www.flaticon.com */}
                        <img src={resolve('/404.svg')} alt="404" className={classes.notFoundIcon}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default PathNotFoundPage;