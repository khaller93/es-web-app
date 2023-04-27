import * as PropTypes from 'prop-types';
import statusType from './status';

export default PropTypes.shape({
  title: PropTypes.string,
  short_title: PropTypes.string,
  default_role: PropTypes.string,
  status: statusType,
  enable: PropTypes.instanceOf(Object),
  roles: PropTypes.instanceOf(Object),
  supported_languages: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.instanceOf(Object),
});
