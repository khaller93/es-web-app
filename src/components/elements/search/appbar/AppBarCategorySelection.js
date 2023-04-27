import React from 'react';
import {FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import {makeStyles} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
import intLabelInMap from "../../../../configuration/intLabelInMap";


/* styles for the category selection */
const styles = makeStyles(theme => ({
    catMenuItem: {
        color: theme.palette.common.white,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingTop: '0.35rem',
        paddingBottom: '0.35rem',
        textTransform: 'uppercase'
    }
}));

/**
 * This React element is intended to be used in combination with a search bar in the app bar.
 * It allows the user to select the category.
 *
 * @param categoryConfig config for categories that can be selected by the user.
 * @param inputRef reference object for tracking the text in the search bar.
 * @param intl object for internationalization.
 */
const AppBarCategorySelection = ({categoryConfig, inputRef, intl}) => {
    const categories = Object.keys(categoryConfig);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    inputRef.current = {value: null};

    /**
     * handles the event of a category being selected.
     *
     * @param event of the selection.
     * @param index of the category that has been selected.
     */
    const handleCategoryItemClick = (event, index) => {
        if (index === 0) {
            inputRef.current.value = null;
        } else if (index > 0) {
            inputRef.current.value = categories[index - 1];
        }
        setSelectedIndex(index);
        setOpen(false);
    };

    /**
     * handle the close of the categories popup.
     */
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    /**
     *
     * @param event
     */
    const handleToggle = (event) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
        setOpen(prevOpen => !prevOpen);
    };

    /**
     * gets the label of the category with the given index.
     *
     * @param index of the category for which the label shall be returned.
     * @return {*} the label of the category with the given index.
     */
    const getLabelForIndex = (index) => {
        return getLabel(categories[index - 1]);
    };

    /**
     * gets the label of the given category.
     *
     * @param cat for which the label shall be returned.
     * @return {*} the label of the given category.
     */
    const getLabel = (cat) => {
        if (cat && categoryConfig[cat] && categoryConfig[cat].name) {
            return intLabelInMap(categoryConfig[cat].name, intl);
        }
        return null;
    };

    const classes = styles();
    return (
        <FormControl style={{color: 'white'}}>
            <Button
                size="small"
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.catMenuItem}
            >
                {selectedIndex === 0 ?
                    <FormattedMessage id="app.search-bar.all-category"/> : getLabelForIndex(selectedIndex)}
                <ArrowDropDownIcon/>
            </Button>
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper id="menu-list-grow">
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem key="all-menu-item" selected={selectedIndex === 0}
                                              onClick={event => handleCategoryItemClick(event, 0)}>
                                        <FormattedMessage id="app.search-bar.all-category"/>
                                    </MenuItem>
                                    {categories.map((cat, index) => (
                                        <MenuItem
                                            key={cat}
                                            selected={(index + 1) === selectedIndex}
                                            onClick={event => handleCategoryItemClick(event, index + 1)}
                                        >
                                            {getLabel(cat)}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </FormControl>
    );
};

AppBarCategorySelection.propTypes = {
    categoryConfig: PropTypes.object.isRequired,
    inputRef: PropTypes.object,
    intl: PropTypes.any.isRequired,
};

export default AppBarCategorySelection;