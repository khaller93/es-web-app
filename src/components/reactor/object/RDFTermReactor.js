import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import ResourceReactorComponent from "./ResourceReactorComponent";
import LiteralReactorComponent from "./LiteralReactorComponent";

/* map the reactor config to this reactor */
const mapReactorConfig = state => ({
    reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
});

/**
 * This React element is finding the correct React element for
 * a given term that is used in a given widget and embedded in
 * a given context.
 *
 * @param getReactorConfigEntry a function for extracting the correct
 * entry in the configuration.
 * @param term that shall be represented.
 * @param widget for which the term shall be represented.
 * @param role the currently activated role.
 * @param componentProps props that shall be handed to the root element.
 * @param intl object for internationalization.
 */
const RDFTermReactor = ({role, mode, term, reactorConfig, getReactorConfigEntry, componentProps, intl}) => {
    const type = term.type === 'uri' ? 'iri' : term.type;
    switch (type) {
        case 'iri':
            return <ResourceReactorComponent iri={term.value} role={role} mode={mode}
                                             reactorConfig={reactorConfig}
                                             getReactorConfigEntry={getReactorConfigEntry}
                                             componentProps={componentProps}
                                             intl={intl}/>;
        case 'literal':
            return <LiteralReactorComponent mode={mode} role={role} value={term.value} datatypeIRI={term.datatype}
                                            reactorConfig={reactorConfig} languageTag={term['xml:lang']}
                                            getReactorConfigEntry={getReactorConfigEntry}
                                            componentProps={componentProps} intl={intl}/>;
        default:
            return null;
    }
};

RDFTermReactor.propTypes = {
    getReactorConfigEntry: PropTypes.func.isRequired,
    term: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    componentProps: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default connect(mapReactorConfig)(RDFTermReactor);