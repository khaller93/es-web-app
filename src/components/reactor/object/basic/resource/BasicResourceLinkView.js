import React from "react";
import Link from "@material-ui/core/Link";
import {name} from "../../../../../models/rdf/resource";
import {Link as RouterLink} from "react-router-dom";
import {getPathForExploration} from "../../../../../history/navigation";
import SearchState from "../../../../../models/state/SearchState";
import loadResourceDescription from "../../../utils/loadResourceDescription";

/**
 * This React element displays a link for a given resource. The label of
 * this resource is used as text of the link and the link refers to
 * the search of this name using the search explorer.
 */
const BasicResourceLinkView = ({role, iri, values, mode, supportedLanguages, descriptionConfig, props, intl, dispatch}) => {
    loadResourceDescription({role, iri, values, supportedLanguages, descriptionConfig, dispatch});

    const label = name(iri, values, intl);
    const ResourceLink = React.forwardRef((props, ref) => (
        <RouterLink innerRef={ref} to={getPathForExploration(SearchState.of({
            role,
            searchText: label,
            selectedResource: iri,
        }))} {...props} />
    ));
    return (
        <Link component={ResourceLink} {...props}>
            {label}
        </Link>
    )
};

export default BasicResourceLinkView;