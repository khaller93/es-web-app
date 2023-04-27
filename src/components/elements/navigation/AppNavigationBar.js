import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import * as PropTypes from "prop-types";
import {navigate} from "../../../history/navigation";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
    appBar: {
        backgroundColor: '#2a3338',
    }
}));

/**
 * This React component handles the navigation bar at the top of the page.
 *
 * @params title string which shall displayed in the app bar.
 * @params children react element(s) that shall be displayed in the app bar.
 */
const AppNavigationBar = ({title, children}) => {

    /**
     * method that shall be triggered, if
     * the home button is clicked. it will
     * navigate the app to the home page.
     */
    const handleHomeNavigation = () => {
        navigate('Home');
    };

    const classes = styles();
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleHomeNavigation}
                >
                    <HomeIcon/>
                </IconButton>
                {title ? (
                    <Typography variant="h6">
                        {title}
                    </Typography>
                ) : null}
                {children}
            </Toolbar>
        </AppBar>
    );
};

AppNavigationBar.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export default AppNavigationBar;