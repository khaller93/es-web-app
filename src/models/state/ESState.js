import * as PropTypes from 'prop-types';
import Hashes from 'jshashes';

/**
 * A class maintaining the Exploratory Search state and providing
 * helpful tools concerning it.
 */
class ESState {
  constructor(method, role = '_') {
    this.method = method;
    this.role = role;
  }

  /**
   * checks whether the given other state matches this state (i.e. key information are the same).
   *
   * @param otherState which shall be checked.
   * @return {*|boolean} true, if the given other state matches this one, otherwise, false.
   */
  match(otherState) {
    return (this.method === otherState.method) && (this.role === otherState.role);
  }

  /**
   * gets a plain old Javascript object holding the key information.
   *
   * @return {{}} a plain old Javascript object holding the key information.
   */
  get plainObject() {
    return { method: this.method, id: this.id, role: this.role };
  }

  /**
   * gets a compact string for the key information.
   *
   * @return {string} a compact string for the key information.
   */
  get string() {
    return `[m:${this.method}/][r:${this.role}/]`;
  }

  /**
   * a hash value for the key information maintained by this state.
   *
   * @return {number} hash value for the key information maintained by this state.
   */
  get id() {
    return new Hashes.MD5().hex(this.string);
  }

  /**
   * gets the object for navigating through this application from the query parameters specified
   * in an URL.
   *
   * @param queryParams
   * @return {{}}
   */
  navigationObject(queryParams) {
    return {
      routeName: 'Explorer',
      params: {
        method: this.method,
      },
      query: queryParams,
    };
  }
}

ESState.propTypes = {
  method: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default ESState;
