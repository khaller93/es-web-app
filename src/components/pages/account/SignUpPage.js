import React from 'react';
import {FormattedMessage} from "react-intl";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Page from "../Page";
import styles from "./styles";
import {getPathFor} from "../../../history/navigation";
import {Link as RouterLink} from "react-router-dom";

const SignInLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={getPathFor('SignIn')} {...props} />
));

/**
 *  This React component a specialisation of a page that contains
 *  a registration form.
 */
const SignUpPage = ({intl}) => {
    const classes = styles();

    return (
        <Page>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{textTransform: 'capitalize'}}>
                        <FormattedMessage id="app.account.signup" defaultMessage="Sign up"/>
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth
                                           id="firstName" autoFocus
                                           label={intl.formatMessage({
                                               id: 'app.account.firstname',
                                           })}
                                           style={{textTransform: 'capitalize'}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" required fullWidth id="lastName" name="lastName"
                                           autoComplete="lname"
                                           label={intl.formatMessage({
                                               id: 'app.account.lastname',
                                           })}
                                           style={{textTransform: 'capitalize'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth id="email" name="email"
                                           autoComplete="email"
                                           label={intl.formatMessage({
                                               id: 'app.account.email-address',
                                           })}
                                           style={{textTransform: 'capitalize'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth name="password" type="password"
                                           id="password" autoComplete="current-password"
                                           label={intl.formatMessage({
                                               id: 'app.account.password'
                                           })}
                                           style={{textTransform: 'capitalize'}}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            <FormattedMessage id="app.account.signup" defaultMessage="Sign up"/>
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link variant="body2" component={SignInLink}>
                                    <FormattedMessage id="app.account.already-account"/>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Page>
    );
};

export default SignUpPage;