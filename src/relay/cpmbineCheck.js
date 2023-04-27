import * as PropTypes from 'prop-types';

/**
 *
 *
 *
 * @param checks an array of functions that accept a value object as argument and
 * returns either 'loaded', 'loading' or 'error'.
 * @returns function that accepts a value object as argument and
 * returns either 'loaded', 'loading' or 'error'.
 */
function combineCheck(checks) {
  return (values) => {
    const statusList = [];
    for (let i = 0; i < checks.length; i += 1) {
      const statusObj = checks[i](values);
      statusList.push(statusObj ? statusObj.value : null);
    }
    if (statusList.includes('error')) {
      return { value: 'error' };
    }
    if (statusList.includes('loading')) {
      return { value: 'loading' };
    }
    if (statusList.filter((s) => s === 'loaded').length === checks.length) {
      return { value: 'loaded' };
    }
    return {};
  };
}

combineCheck.propTypes = {
  checks: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default combineCheck;
