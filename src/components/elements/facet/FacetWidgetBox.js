import React from "react";
import Grid from "@material-ui/core/Grid";
import FacetWidgetBase from "./FacetWidgetBase";

/**
 * A box that displays all the selected widgets.
 *
 * @param className that shall be put on the root element.
 * @param predicateList all the predicates for which the facet
 * widget shall be shown.
 * @param valueMap a map of values to use for filtering for each
 * passed predicate.
 * @param onClose optional function handling the closure of widgets.
 * @param intl internationalization object.
 */
const FacetWidgetBox = ({className, predicateList, valueMap, onChange, onClose, intl}) => {

    return <Grid container spacing={1}>
        {predicateList.map((predicate) => (
            <Grid item xs={6} key={`facet-widget-${predicate.id.toLowerCase()}`}>
                <FacetWidgetBase predicate={predicate} values={valueMap && valueMap[predicate.id] ? valueMap[predicate.id] : {}}
                                 onChange={onChange} intl={intl} onClose={onClose}/>
            </Grid>
        ))}
    </Grid>;
};

export default FacetWidgetBox;