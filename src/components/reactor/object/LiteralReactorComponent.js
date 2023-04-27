import * as PropTypes from "prop-types";
import React from "react";
import BasicLiteralSwitch from "./basic/literal/BasicLiteralSwitch";
import VerboseLiteralView from "./basic/literal/VerboseLiteralView";
import {literal} from "../../../configuration/reactorConfiguration";
import ExternalLinkLiteral from "./basic/literal/default/ExternalLinkLiteral";
import TimeLiteral from "./basic/literal/default/TimeLiteral";
import LanguageAwareTextLiteral from "./basic/literal/default/LanguageAwareTextLiteral";

/* map of available handler for resources and literals.
 *   key: the name that is used in the reactor config
 *   value: the React element to which it shall be mapped.
 */
const handlerMap = {
    'VerboseLiteral': VerboseLiteralView,
    'BasicLiteral': BasicLiteralSwitch,
    'ExternalLink': ExternalLinkLiteral,
    'DateTime': TimeLiteral,
    'LanguageAwareText': LanguageAwareTextLiteral,
};

/**
 * This React component is a wrapper for literal components.
 *
 * @param role the currently activated role.
 * @param mode 'view' or 'edit'.
 * @param value text of the literal.
 * @param datatypeIRI  datatype of the literal.
 * @param languageTag language tag of the literal.
 * @param config for this literal.
 * @param componentProps props that shall be passed to the given component.
 * @param intl object for internationalization.
 */
const LiteralReactorComponent = ({role, mode, value, datatypeIRI, languageTag, reactorConfig, getReactorConfigEntry, componentProps, intl}) => {
    let Comp = BasicLiteralSwitch;
    if (reactorConfig && getReactorConfigEntry) {
        const lConfig = getReactorConfigEntry(reactorConfig);
        if (lConfig) {
            if (lConfig['object_handler'] && lConfig['object_handler'] in handlerMap) {
                Comp = handlerMap[lConfig['object_handler']];
            }
        }
    }
    return <Comp {...{role, mode, value, datatypeIRI, languageTag, props: componentProps, reactorConfig, intl}}/>;
};

LiteralReactorComponent.propTypes = {
    role: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    datatypeIRI: PropTypes.string,
    languageTag: PropTypes.string,
    config: PropTypes.object,
    getReactorConfigEntry: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default LiteralReactorComponent;