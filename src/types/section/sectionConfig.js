import * as PropTypes from 'prop-types';

export default PropTypes.shape({
  config: PropTypes.shape({
    label: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    depiction: PropTypes.arrayOf(PropTypes.string),
  }),
  neighbourhood: PropTypes.instanceOf(Object),
});
