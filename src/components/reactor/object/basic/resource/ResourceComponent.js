import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import roleSpecificEntryInMap from "../../../../../configuration/utils/roleSpecificEntryInMap";

/* maps resources values to resource component */
const mapToProps = (role, iri) => {
    return state => {
        const role = state.app && state.app.role ? state.app.role : '_';
        let values = null;
        if (state.resources && state.resources[iri]) {
            const resourceState = roleSpecificEntryInMap(state.resources[iri], role);
            if (resourceState) {
                values = resourceState;
            }
        }
        const searchConfig = roleSpecificEntryInMap(state.explorer.config && state.explorer.config.search ? state.explorer.config.search : {}, role);
        return {
            values: values,
            supportedLanguages: state.app.config ? state.app.config['supported_languages'] : null,
            descriptionConfig: searchConfig.snippet ? searchConfig.snippet : {},
        };
    }
};

/**
 * This React component provides utility function for mapping the
 * resource values of the given IRI to the given component such that
 * it needs not to be done by the component itself.
 *
 * @param role the currently activated role.
 * @param mode 'view' or 'edit'.
 * @param iri the IRI of the resource that shall be displayed for viewing.
 * @param component that shall be used to represent the given IRI.
 * @param supportedLanguages
 * @param descriptionConfig
 * @param componentProps props that shall be passed to the given component.
 * @param config configuration for the resource component.
 * @param intl internationalization object.
 */
const ResourceComponent = ({role, mode, iri, component, supportedLanguages, descriptionConfig, componentProps, config, intl}) => {
    const Comp = connect(mapToProps(role, iri))(component);
    return <Comp iri={iri} role={role} supportedLanguages={supportedLanguages} descriptionConfig={descriptionConfig}
                 mode={mode} intl={intl} config={config} {...componentProps}/>
};

ResourceComponent.propTypes = {
    role: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    iri: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    componentProps: PropTypes.object,
    config: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default ResourceComponent;