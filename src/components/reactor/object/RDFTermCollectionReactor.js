import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import CommaSeparatedList from "./basic/collection/CommaSeparatedList";
import BasicList from "./basic/collection/BasicList";
import LanguageAwareCommaSeparatedList from "./basic/collection/LanguageAwareCommaSeparatedList";
import ResourceBox from "./basic/collection/ResourceBox";

const handlerMap = {
    'ResourceBox': ResourceBox,
    'CommaSeparatedList': CommaSeparatedList,
    'BasicList': BasicList,
    'LanguageAwareCommaSeparatedList': LanguageAwareCommaSeparatedList,
};

const mapReactorConfig = state => ({
    reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
});

/**
 * This React element is finding the correct React element for
 * a given collection of terms that is used in a given widget
 * and embedded in a given context.
 *
 * @param getReactorConfigEntry a function for extracting the correct
 * entry in the configuration.
 * @param terms that shall be represented.
 * @param objects for which the term shall be represented.
 * @param role the currently activated role.
 * @param componentProps props that shall be handed to the root element.
 * @param intl object for internationalization.
 */
const RDFTermCollectionReactor = ({role, mode, objects, reactorConfig, getReactorConfigEntry, componentProps, intl}) => {
    if (!getReactorConfigEntry) {
        getReactorConfigEntry = config => config;
    }
    const config = getReactorConfigEntry(reactorConfig);
    const Comp = config && config['collection_handler'] && handlerMap[config['collection_handler']] ?
        handlerMap[config['collection_handler']] : CommaSeparatedList;
    const props = {...componentProps, getReactorConfigEntry: getReactorConfigEntry};
    return <Comp role={role} mode={mode} objects={objects}
                 config={config && config['collection_handler'] && handlerMap[config['collection_handler']] &&
                 handlerMap[config['collection_handler']].config ?
                     handlerMap[config['collection_handler']].config : {}}
                 intl={intl} {...props}/>;
};

RDFTermCollectionReactor.propTypes = {
    role: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    objects: PropTypes.array.isRequired,
    reactorConfig: PropTypes.object.isRequired,
    getReactorConfigEntry: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default connect(mapReactorConfig)(RDFTermCollectionReactor);