import React from 'react';
import {FormattedMessage} from "react-intl";
import {Link as RouterLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import {getPathFor} from '../../../history/navigation';
import Page from "../Page";
import styles from "./styles";

const SignUpLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to={getPathFor('SignUp')} {...props} />
));

/**
 * This React component a specialisation of a page that contains
 * a sign in form.
 */
const SignInPage = ({intl}) => {
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
                        <FormattedMessage id="app.account.signin" defaultMessage="Sign in"/>
                    </Typography>
                    <form className={classes.form}>
                        <TextField variant="outlined" margin="normal" required fullWidth id="email" name="email"
                                   autoComplete="email" autoFocus style={{textTransform: 'capitalize'}}
                                   label={intl.formatMessage({
                                       id: 'app.account.email-address'
                                   })}
                        />
                        <TextField variant="outlined" margin="normal" required fullWidth name="password" type="password"
                                   id="password" autoComplete="current-password" style={{textTransform: 'capitalize'}}
                                   label={intl.formatMessage({
                                       id: 'app.account.password'
                                   })}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label={intl.formatMessage({
                                id: 'app.account.remember-me'
                            })}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            <FormattedMessage id="app.account.signin" defaultMessage="sign in"/>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" style={{cursor: 'pointer'}}>
                                    <FormattedMessage id="app.account.forgot-password"
                                                      defaultMessage="Forgot password?"/>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component={SignUpLink}>
                                    <FormattedMessage id="app.account.no-account"
                                                      defaultMessage="Don't have an account? Sign Up"/>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Page>
    );
};

export default SignInPage;