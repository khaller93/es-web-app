import * as PropTypes from "prop-types";

/**
 * combines the given array of fetch functions and returns a
 * function that executes them.
 *
 * @param fetchArray array of fetch functions that shall be
 * executed.
 * @return a function that executes the multiple fetches.
 */
const combineFetch = (fetchArray) => {
    return () => {
        for (let i = 0; i < fetchArray.length; i++) {
            fetchArray[i]();
        }
    };
}

combineFetch.propTypes = {
    fetchArray: PropTypes.array.isRequired,
};

export default combineFetch;
