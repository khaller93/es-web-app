import {connect} from "react-redux";
import React from "react";
import Link from "@material-ui/core/Link";
import extractPrefix from "../../../../../utils/extractPrefix";
import BasicResourceLinkView from "./BasicResourceLinkView";
import {getPrefixForNamespace} from "../../../../../actions/prefix";

/* maps the prefix map to this view */
const mapToProps = state => ({
    prefix: state.prefix,
});

/**
 * This React element analyses the IRI of an resource, trying to extract the prefix
 *  from it. The resource is then displayed as a link that refers to the external IRI.
 *  However, the text of the link is assembled of the prefix and the corresponding suffix.
 */
const PrefixResourceLinkView = ({role, iri, values, mode, props, prefix, intl, dispatch}) => {

        const getPrefixInfo = () => {
            let matchingPrefix = null;
            if (iri && prefix.reverse) {
                for (let p in prefix.reverse) {
                    if (iri.startsWith(p)) {
                        if (matchingPrefix === null || matchingPrefix.length < p.length) {
                            matchingPrefix = p;
                        }
                    }
                }
            }
            if (matchingPrefix) {
                return {
                    prefix: prefix.reverse[matchingPrefix],
                    value: iri.replace(matchingPrefix, ''),
                }
            } else {
                const info = extractPrefix(iri);
                if (info) {
                    getPrefixForNamespace(info.prefixIRI, prefix.history, dispatch);
                    return info;
                } else {
                    return null;
                }
            }
        };

        const info = getPrefixInfo();
        return (
            <Link href={iri} {...props}>
                {info ? info.prefix + ':' + info.value :
                    <BasicResourceLinkView role={role} iri={iri} values={values} mode={mode} props={props} prefix={prefix}
                                           intl={intl} dispatch={dispatch}/>}
            </Link>
        )
    }
;


export default connect(mapToProps)(PrefixResourceLinkView);