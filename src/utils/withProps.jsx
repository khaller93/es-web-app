import React from 'react';

/**
 * injects given property objects into the given React component.
 *
 * @param Component into which the properties shall be injected.
 * @param props which shall be injected.
 * @return {function(*): *} React component with the injected properties.
 */
export default function withProps(Component, props) {
  return (matchProps) => <Component {...props} {...matchProps} />;
}
