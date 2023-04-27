import * as PropTypes from 'prop-types';
import explorerConfig from './explorerConfig';

export default PropTypes.shape({
  resultDict: PropTypes.instanceOf(Object),
  state: PropTypes.instanceOf(Object),
  status: PropTypes.instanceOf(Object),
  config: explorerConfig,
});
