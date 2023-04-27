import React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import BasicPredicate from "./PredicateProperty";

/* map of available handler for properties.
 *   key: the name that is used in the reactor config
 *   value: the React element to which it shall be mapped.
 */
const handlerMap = {
  'BasicPredicate': BasicPredicate,
};

const mapReactorConfig = state => ({
  reactorConfig: state.reactor && state.reactor.config ? state.reactor.config : {},
});

const PredicateReactor = ({ role, mode, predicate, objects, reactorConfig, getReactorConfigEntry, componentProps, intl }) => {
  if (!getReactorConfigEntry) {
    getReactorConfigEntry = config => config;
  }
  const config = getReactorConfigEntry(reactorConfig);
  const Comp = config && config['property_handler'] && handlerMap[config['property_handler']] ?
    handlerMap[config['property_handler']] : BasicPredicate;
  const props = { ...componentProps, getReactorConfigEntry: getReactorConfigEntry };
  return <Comp role={role} mode={mode} predicate={predicate} objects={objects}
               config={getReactorConfigEntry(reactorConfig)} intl={intl} {...props}/>;
};

PredicateReactor.propTypes = {
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  predicate: PropTypes.string.isRequired,
  objects: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  getReactorConfigEntry: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default connect(mapReactorConfig)(PredicateReactor);