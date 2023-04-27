import React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {LibraryBooks} from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from '@material-ui/icons/Delete';
import SearchItem from "./item/SearchItem";
import SPARQLSearchItem from "./item/SPARQLSearchItem";
import {clearHistory} from "../../../actions/history";
import TreeViewItem from "./item/TreeViewItem";

/* styles for this history menu element */
const styles = makeStyles((theme) => ({
    'popover': {
        width: '30rem',
    },
    'clearHistoryItem': {
        textAlign: 'center'
    },
    popoverContent: {
        padding: theme.spacing(0)
    },
    popoverBottom: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(0)
    },
    clearAllButton: {
        width: '100%'
    }
}));

/* map of history items */
const itemMap = {
    'search': SearchItem,
    'sparql': SPARQLSearchItem,
    'treeview': TreeViewItem,
};

/* extracts the history from the state */
const mapHistory = state => {
    const role = state.app && state.app.role ? state.app.role : '_';
    let history;
    if (state.history && state.history.list && state.history.list.length > 0) {
        history = state.history.list.filter(esstate => esstate.role === role)
    } else {
        history = [];
    }
    return {
        history: history,
    }
};

/**
 *
 * @param root arguments that shall be handed to the popover.
 * @param history that shall be rendered.
 * @param maxItemsDisplayed
 * @param handleMenuClosed
 * @param handleHistoryCleanRequest
 * @param intl internationalization object.
 */
const MenuPopover = ({root, history, maxItemsDisplayed, handleMenuClosed, handleHistoryCleanRequest, intl}) => {
    const classes = styles();

    return <Popover  {...root}>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <LibraryBooks/>
                    </Avatar>
                }
                title={<Typography variant="h5" component="span"><FormattedMessage
                    id="app.menu.history-title"/></Typography>}
            />
            <CardContent className={classes.popoverContent}>
                <List component="nav" aria-label="main mailbox folders" className={classes.popover}>
                    {history.length > 0 ? <Divider variant="inset" component="li"/> : null}
                    {history.slice(0, maxItemsDisplayed).map((esState, index) => {
                        if (esState.method && itemMap[esState.method]) {
                            const Comp = itemMap[esState.method];
                            return <React.Fragment key={'history-menu-item-' + index}>
                                <Comp state={esState}
                                      onClick={handleMenuClosed} intl={intl}/>
                                <Divider variant="inset" component="li"/>
                            </React.Fragment>
                        }
                        return null;
                    })}
                </List>
            </CardContent>
            <CardActions className={classes.popoverBottom} disableSpacing>
                <Button className={classes.clearAllButton} startIcon={<DeleteIcon/>}
                        variant="contained" color="secondary"
                        aria-label={intl.formatMessage({id: 'app.menu.clear-history'})}
                        onClick={handleHistoryCleanRequest}>
                    <FormattedMessage id="app.menu.clear-history"/>
                </Button>
            </CardActions>
        </Card>
    </Popover>
}


/**
 * This React element maintains the history menu and facilitates the navigation
 * through the history.
 *
 * @param history of the current user (injected by redux).
 * @param categoryConfig configuration for the categories (injected by redux).
 * @param maxItemsDisplayed the number of history items that shall be displayed. Per
 * default it is 4.
 * @param dispatch function to issue actions (injected by redux).
 * @param intl object for internationalization.
 */
const HistoryMenu = ({history, categoryConfig, maxItemsDisplayed = 4, intl, dispatch}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    /**
     * this method handles the request of opening the history menu.
     *
     * @param event of the opening click.
     */
    const handleMenuOpened = (event) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
    };

    /**
     * this method handles the closure of the history menu.
     */
    const handleMenuClosed = () => {
        setAnchorEl(null);
    };

    /**
     * handles the request of the user to clean the history.
     */
    const handleHistoryCleanRequest = () => {
        setAnchorEl(null);
        dispatch(clearHistory());
    };

    return (
        <div>
            <Button aria-controls="history-menu" aria-haspopup="true" color="inherit" size="medium"
                    onClick={handleMenuOpened} disabled={!history || history.length === 0}>
                <LibraryBooks/>
            </Button>
            {history && history.length > 0 ?
                <MenuPopover root={{
                    id: 'history-menu',
                    keepMounted: true,
                    anchorEl: anchorEl,
                    open: Boolean(anchorEl),
                    onClose: handleMenuClosed,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    }
                }} maxItemsDisplayed={maxItemsDisplayed} intl={intl} history={history}
                             handleMenuClosed={handleMenuClosed}
                             handleHistoryCleanRequest={handleHistoryCleanRequest}/> : null}
        </div>
    );
};

export default connect(mapHistory)(HistoryMenu);
