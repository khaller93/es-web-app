import React from "react";
import Link from "@material-ui/core/Link";
import {name} from "../../../../../models/rdf/resource";
import {Link as RouterLink} from "react-router-dom";
import {getPathForExploration} from "../../../../../history/navigation";
import SearchState from "../../../../../models/state/SearchState";
import loadResourceDescription from "../../../utils/loadResourceDescription";

/**
 * This React element displays a link for a given resource, but displays the resource
 * as an image using the IRI as source.
 */
const ImageResourceLinkView = ({role, iri, values, mode, supportedLanguages, descriptionConfig, props, intl, dispatch}) => {
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
            <img src={iri} style={{maxWidth: '100%'}} alt={label}/>
        </Link>
    )
};

export default ImageResourceLinkView;