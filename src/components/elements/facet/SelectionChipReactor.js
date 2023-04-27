import React from 'react';
import PropTypes from "prop-types";
import OrSelectionChip from "./bar/OrSelectionChip";

const selectionMap = {
    or: OrSelectionChip,
};

/**
 *  A chip displaying the given selection for the given predicate.
 *
 * @param role that is currently active.
 * @param predicate for which the selection shall be displayed.
 * @param selection that shall be displayed.
 * @param onClick optional function that is called, when this
 * chip displaying the selection has been clicked.
 * @param onSelectionDelete optional function that is called, when
 * the deletion of a selection has been requested.
 * @param intl internationalization object.
 */
const SelectionChipReactor = ({role, predicate, selection, onClick, onSelectionDelete, intl}) => {
    if (selection && selectionMap[selection.type]) {
        const Comp = selectionMap[selection.type];
        return <Comp role={role} predicate={predicate} selection={selection} onClick={onClick}
                     onSelectionDelete={onSelectionDelete} intl={intl}/>;
    } else {
        return null;
    }
}

SelectionChipReactor.propTypes = {
    role: PropTypes.string.isRequired,
    predicate: PropTypes.object.isRequired,
    selection: PropTypes.object,
    onClick: PropTypes.func,
    onSelectionDelete: PropTypes.func,
    intl: PropTypes.object.isRequired
};

export default SelectionChipReactor;