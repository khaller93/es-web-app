import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// material components
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
// ESS elements
import AppNavigationBar from '../elements/navigation/AppNavigationBar';
import LanguageMenu from '../elements/language/LanguageMenu';
import RoleMenu from '../elements/role/RoleMenu';
import HistoryMenu from '../elements/history/HistroyMenu';
// redux actions
import { switchLanguage, switchRole } from '../../actions/app';
// navigation
import { navigate } from '../../history/navigation';
// prop types
import appType from '../../types/app';

/**
 * This React component is a general page that needs to be filled with components
 * by the user of this component. It allows to add menu components to the navigation
 * bar by passing them with
 */
function Page({
  app, menus, children, dispatch, intl,
}) {
  /**
   * handle language changes.
   *
   * @param lang to which the language shall be changed.
   */
  function handleLanguageChange(lang) {
    if (lang && lang !== app.language) {
      dispatch(switchLanguage(lang));
    }
  }

  /**
   * handle role changes.
   *
   * @param role to which the role shall be changed.
   */
  function handleRoleChange(role) {
    if (role && role !== app.role) {
      dispatch(switchRole(role));
    }
  }

  function handleShowInfo() {
    navigate('About');
  }

  return (
    <React.Fragment key="kge-page">
      <AppNavigationBar>
        {menus}
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <HistoryMenu intl={intl} />
          {app.role && app.config && app.config.roles && Object.keys(app.config.roles).length > 0
            ? (
              <RoleMenu
                activeRole={app.role}
                supportedRoles={app.config.roles}
                onRoleChanged={handleRoleChange}
                intl={intl}
              />
            ) : null}
          <LanguageMenu
            language={app.language}
            supportedLanguages={app.config && app.config.supported_languages
              ? app.config.supported_languages : []}
            intl={intl}
            onLanguageChanged={handleLanguageChange}
          />
          <Button
            aria-controls="language-menu"
            aria-haspopup="true"
            color="inherit"
            size="medium"
            onClick={handleShowInfo}
          >
            <InfoIcon />
          </Button>
        </div>
      </AppNavigationBar>
      {children}
    </React.Fragment>
  );
}

Page.defaultProps = {
  menus: [],
};

Page.propTypes = {
  app: appType.isRequired,
  menus: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

export default injectIntl(connect((state) => ({ app: state.app }))(Page));
