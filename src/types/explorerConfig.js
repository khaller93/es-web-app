import * as PropTypes from 'prop-types';

export default PropTypes.shape({
  search: PropTypes.instanceOf(Object),
  facet: PropTypes.instanceOf(Object),
  status: PropTypes.instanceOf(Object),
  treeview: PropTypes.instanceOf(Object),
});
