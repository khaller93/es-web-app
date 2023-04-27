import * as PropTypes from 'prop-types';
import appConfigType from './appConfig';

export default PropTypes.shape({
  role: PropTypes.string,
  language: PropTypes.string,
  locale: PropTypes.string,
  timeZone: PropTypes.string,
  config: appConfigType,
});
