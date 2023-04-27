import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import roleSpecificEntryInMap from "../../../configuration/utils/roleSpecificEntryInMap";
import BasicResourceLinkView from "./basic/resource/BasicResourceLinkView";
import PrefixResourceLinkView from "./basic/resource/PrefixResourceLinkView";
import ResourceCard from "./basic/resource/ResourceCard";
import withProps from "../../../utils/withProps";
import loadClassInfo from "../utils/loadClassInfo";
import ResourceTreeView from "./basic/resource/ResourceTreeView";
import ExternalResourceLinkView from "./basic/resource/ExternalResourceLinkView";

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

/* map of available handler for resources and literals.
 *   key: the name that is used in the reactor config
 *   value: the React element to which it shall be mapped.
 */
const handlerMap = {
    'BasicSearchLink': BasicResourceLinkView,
    'PrefixLink': PrefixResourceLinkView,
    'ResourceCard': ResourceCard,
    'ResourceTreeView': ResourceTreeView,
    'ExternalLinkView': ExternalResourceLinkView,
};

const Component = ({role, mode, iri, reactorConfig, getReactorConfigEntry, values, supportedLanguages, descriptionConfig, componentProps, intl, dispatch}) => {
    if (values && values['classInfo'] && values.classInfo.status) {
        let resourceConfig = {};
        let ComponentType = BasicResourceLinkView;
        if (reactorConfig && getReactorConfigEntry) {
            resourceConfig = getReactorConfigEntry(reactorConfig);
            if (resourceConfig) {
                if (resourceConfig['object_handler'] && handlerMap[resourceConfig['object_handler']]) {
                    ComponentType = handlerMap[resourceConfig['object_handler']];
                }
            }
        }
        const Comp = withProps(ComponentType, Object.assign({}, componentProps, {
            iri, role, mode, values, supportedLanguages, descriptionConfig, config: resourceConfig, intl, dispatch,
        }));
        return <Comp/>
    } else {
        loadClassInfo({iri, values, dispatch});
        return null;
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
 * @param componentProps props that shall be passed to the given component.
 * @param intl internationalization object.
 */
const ResourceReactorComponent = ({role, mode, iri, reactorConfig, getReactorConfigEntry, componentProps, intl}) => {
    const Comp = connect(mapToProps(role, iri))(withProps(Component, {
        role, mode, iri, reactorConfig, getReactorConfigEntry, componentProps, intl
    }));
    return <Comp/>;
};

ResourceReactorComponent.propTypes = {
    role: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    iri: PropTypes.string.isRequired,
    config: PropTypes.object,
    getReactorConfigEntry: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default ResourceReactorComponent;