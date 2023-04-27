import React from "react";
import OptionWidget from "./widget/OptionWidget";
import RangeWidget from "./widget/RangeWidget";

const facetWidgetMap = {
    'Options': OptionWidget,
    'Range': RangeWidget,
};

/**
 * Takes a look at the given predicate configuration, and then
 * renders the corresponding widget.
 *
 * @param className that shall be placed on the root element.
 * @param predicate for which a widget shall be rendered.
 * @param values object for the predicate.
 * @param onChange optional function that is called, when an selection change
 * has occurred.
 * @param intl internationalization object.
 */
const FacetWidgetReactor = ({className, predicate, values, onChange, intl}) => {
    let Comp = OptionWidget;
    if (predicate['facet_handler'] && facetWidgetMap[predicate['facet_handler']]) {
        Comp = facetWidgetMap[predicate['facet_handler']];
    }
    return <Comp className={className} predicate={predicate} values={values} onChange={onChange} intl={intl}/>
};

export default FacetWidgetReactor;