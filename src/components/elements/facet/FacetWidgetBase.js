import React from "react";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {makeStyles, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import {fade} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FacetWidgetReactor from "./FacetWidgetReactor";
import intLabelInMap from "../../../configuration/intLabelInMap";

const useProgressBoxStyles = makeStyles(theme => ({
    root: {
        minHeight: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    progressBox: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
}));

/**
 * element rendering the loading progress box.
 */
const LoadingBox = () => {
    const classes = useProgressBoxStyles();
    return (
        <Box className={classes.root}>
            <CircularProgress size="5rem" className={classes.progressBox}/>
        </Box>
    )
};

/**
 * element rendering the 'failed fetching the details' box.
 */
const FailedMessageBox = () => {
    const classes = useProgressBoxStyles();
    return (
        <Box className={classes.root}>
            <div className={classes.progressBox}>
                <ErrorOutlineIcon fontSize="large" color="secondary"/>
                <Typography>
                    <FormattedMessage id="app.facet.widget.bar.failed.fetching.details"/>
                </Typography>
            </div>
        </Box>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.grey["100"],
    },
    appBar: {
        flexGrow: 1,
    },
    toolBar: {
        paddingRight: theme.spacing(0.75)
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    }
}));

/**
 * switch that decides with element to render, based on the status
 * of the given 'values' status.
 */
const Base = ({predicate, values, onChange, intl}) => {
    switch (values.status) {
        case 'fetching':
            return <LoadingBox/>;
        case 'failed':
            return <FailedMessageBox/>;
        case 'loaded':
            return <FacetWidgetReactor predicate={predicate} values={values} onChange={onChange} intl={intl}/>;
        default:
            return null;
    }
};

/**
 * A base for facet widget that is handling the basic stuff and
 * then passes control to the facet widget reactor for the specific
 * rendering.
 *
 * @param predicate of this widget.
 * @param values object with the detail values of this widget.
 * @param onClose optional function handling the closure of this widget.
 * @param intl  internationalization object.
 */
const FacetWidgetBase = ({predicate, values, onChange, onClose, intl}) => {
    const classes = useStyles();

    /**
     * handles the event of an user clicking the close button.
     */
    const handleWidgetClose = () => {
        if (onClose) {
            onClose(predicate);
        }
    };

    return <Paper square variant="outlined" className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" className={classes.title}>
                    {intLabelInMap(predicate.name, intl)}
                </Typography>
                <IconButton
                    aria-label={intl.formatMessage({id: 'app.facet.widget.bar.close'})}
                    aria-haspopup="true"
                    onClick={handleWidgetClose}
                    color="inherit"
                >
                    <CloseIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Base predicate={predicate} values={values} onChange={onChange} intl={intl}/>
    </Paper>;
};

FacetWidgetBase.propTypes = {
    predicate: PropTypes.object.isRequired,
    values: PropTypes.object,
    onClose: PropTypes.func,
    intl: PropTypes.object.isRequired,
};

export default FacetWidgetBase;