import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import SelectionChipReactor from "./SelectionChipReactor";

/**
 * A box displaying the given selection for predicates. It's intention is
 * briefly show the user, which selections are currently active and potentially
 * providing a short cut to deactivate selections.
 *
 * @param role that is currently active.
 * @param predicateList a list of all known predicates.
 * @param valueMap the value map  for predicates.
 * @param onClick optional function that is called, when a
 * chip of a certain predicate has been clicked.
 * @param onSelectionDelete optional function that is called, when
 * the deletion of a selection of a certain predicate has been requested.
 * @param intl internationalization object.
 */
const SelectionBarBox = ({role, predicateList, valueMap, onClick, onSelectionDelete, intl}) => {
    return <Box>
        {predicateList && predicateList.map((predicate) => {
            const valMapEntry = valueMap[predicate.id];
            if (valMapEntry && valMapEntry.selection) {
                return <SelectionChipReactor key={`facet-selection-bar-${predicate.id.toLowerCase()}`}
                                             onClick={onClick} onSelectionDelete={onSelectionDelete}
                                             role={role} predicate={predicate} selection={valMapEntry.selection}
                                             intl={intl}/>;
            }
            return null;
        })}
    </Box>
};

SelectionBarBox.propTypes = {
    role: PropTypes.string.isRequired,
    predicateList: PropTypes.array.isRequired,
    valueMap: PropTypes.object,
    onClick: PropTypes.func,
    onSelectionDelete: PropTypes.func,
    intl: PropTypes.object.isRequired
}

export default SelectionBarBox;