import React from "react";
import * as PropTypes from "prop-types";
import TextLiteral from "./default/TextLiteral";
import * as xsdComponentMap from './maps/xsd';

const componentMap = Object.assign(xsdComponentMap);

/**
 * A switch for choosing the correct renderer for a given literal.
 * e.g. maps an xsd:int literal to a NumberLiteral
 */
const BasicLiteralSwitch = props => {
    if (props.datatypeIRI) {
        if (props.datatypeIRI in componentMap) {
            const Comp = componentMap[props.datatypeIRI];
            return <Comp {...props}/>;
        }
    }
    return <TextLiteral {...props}/>;
};

BasicLiteralSwitch.propTypes = {
    role: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    datatypeIRI: PropTypes.string,
    languageTag: PropTypes.string,
    intl: PropTypes.object.isRequired,
};

export default BasicLiteralSwitch;