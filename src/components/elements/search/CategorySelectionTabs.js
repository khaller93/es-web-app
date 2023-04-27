import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import intLabelInMap from "../../../configuration/intLabelInMap";
import {updateCategories} from "../../../actions/searchBar";


/* map active categories to this element */
const mapToProps = state => ({
    activeCategories: state.searchBar && state.searchBar.categories ? state.searchBar.categories : null,
});

/**
 * This React element manages category tabs and allows the user to select
 * between a number of categories.
 *
 * @param activeCategories an array of the categories that shall be activated (injected by redux).
 * @param categoryConfig config for categories that can be selected by the user.
 * @param componentProps property object that is based to the root component.
 * @param inputRef reference object to track the selected categories.
 * @param onChange a callback function that is called, if the selection of categories changes.
 * @param intl object for internationalization.
 * @param dispatch function to issue actions (injected by redux).
 */
const CategorySelectionTabs = ({activeCategories, categoryConfig, componentProps, inputRef, onChange, intl, dispatch}) => {
    const categories = Object.keys(categoryConfig);

    if (inputRef) {
        inputRef.current = {value: activeCategories};
    }

    /**
     * handle the selection of categories.
     *
     * @param event for changing the tabs.
     * @param cat index number of the category that has been selected by the user.
     */
    const handleCategorySelection = (event, cat) => {
        let cats;
        if (cat === undefined || cat === null || cat === 0) {
            cats = ["All"];
        } else {
            if (categories && cat <= categories.length) {
                cats = [categories[cat - 1]];
            }
        }
        if (onChange) {
            onChange(cats);
        }
        dispatch(updateCategories(cats));
    };

    return (
        <Tabs
            {...componentProps}
            indicatorColor="primary"
            textColor="primary"
            value={activeCategories && activeCategories.length > 0 ? categories.indexOf(activeCategories[0]) + 1 : 0}
            onChange={handleCategorySelection}
        >
            <Tab label={intl.formatMessage({
                id: 'app.search-bar.all-category'
            })}/>
            {categories ? categories.map(cat => (
                <Tab key={'cat-tab-' + cat}
                     label={intLabelInMap(categoryConfig[cat].name, intl)}
                />
            )) : null}
        </Tabs>
    );
};

CategorySelectionTabs.propTypes = {
    categoryConfig: PropTypes.object.isRequired,
    componentProps: PropTypes.object,
    inputRef: PropTypes.object,
    onChange: PropTypes.func,
    intl: PropTypes.any.isRequired,
};

export default connect(mapToProps)(CategorySelectionTabs);