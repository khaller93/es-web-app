import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from "@material-ui/icons/Search";
import {updateSearchText} from "../../../actions/searchBar";


/* styles for the search bar */
const styles = makeStyles((theme) => ({
    'searchBar': {
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: 'none',
        border: '1px black solid',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
    },
    'searchBarText': {
        marginLeft: theme.spacing(1),
    }
}));

/* maps the search text to this element */
const mapToProps = state => ({
    searchText: state.searchBar && state.searchBar.searchText ? state.searchBar.searchText : '',
});

/**
 * This React element is a simple search bar.
 *
 * @param name for the search text field.
 * @param searchText text that shall be displayed in the search bar (injected by redux).
 * @param autoFocus true, if this search bar shall be automatically in focus, otherwise false.
 * @param onSearchIssued a function that is triggered, if the user pressed enter or the search button.
 * @param componentProps property object that is based to the root component.
 * @param inputRef reference object for tracking the text in the search bar.
 * @param intl object for internationalization.
 * @param dispatch function to issue actions (injected by redux).
 */
const SearchBar = ({name, searchText, autoFocus, onSearchIssued, componentProps, inputRef, intl, dispatch}) => {

    /**
     * function catching a submit and passing the current
     * value in the search bar to the caller.
     *
     * @param event for submitting the form.
     */
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            if (onSearchIssued) {
                onSearchIssued(searchText);
            }
        }
    };

    /**
     * handles the change of the search text in the search bar by the user.
     *
     * @param event that is triggered, if the search text has changed.
     */
    const handleChange = (event) => {
        if (event && event.target && event.target) {
            dispatch(updateSearchText(event.target.value));
        }
    };

    /**
     * clears the search text field.
     *
     * @param event that is triggered if the clear button is clicked.
     */
    const handleClear = (event) => {
        if (event) {
            dispatch(updateSearchText(''));
        }
    };

    /**
     * checks whether the escape key was pressed down, and if this
     * is the case, the current value is set to an empty string.
     *
     * @param event that is triggered, if a key is pressed down.
     */
    const handleEscapeKeyDown = (event) => {
        if (event && event.keyCode === 27) {
            dispatch(updateSearchText(''));
        }
    };

    const classes = styles();
    return (
        <form onSubmit={handleSubmit} {...componentProps}>
            <Paper className={classes.searchBar}>
                {searchText && searchText.length > 0 ? (
                    <IconButton aria-label="clear search box" onClick={handleClear}>
                        <ClearIcon/>
                    </IconButton>
                ) : null}
                <Input
                    className={classes.searchBarText}
                    name={name}
                    placeholder={intl.formatMessage({
                        id: 'app.search-bar.placeholder'
                    })}
                    value={searchText}
                    fullWidth
                    disableUnderline
                    autoFocus={autoFocus ? true : undefined}
                    inputRef={inputRef}
                    onChange={handleChange}
                    onKeyDown={handleEscapeKeyDown}
                    type="text"
                />
                <IconButton aria-label="start search" type="submit" disabled={!searchText}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
        </form>
    );
};

SearchBar.propTypes = {
    name: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
    componentProps: PropTypes.object,
    onSearchIssued: PropTypes.func,
    inputRef: PropTypes.object,
    intl: PropTypes.any.isRequired,
};

export default connect(mapToProps)(SearchBar);