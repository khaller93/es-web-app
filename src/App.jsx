import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
// page
import SearchStartPage from './components/pages/explorer/SearchStartPage';
import ExplorerPage from './components/pages/explorer/ExplorerPage';
import SignInPage from './components/pages/account/SignInPage';
import SignUpPage from './components/pages/account/SignUpPage';
import AboutPage from './components/pages/about/AboutPage';
import PathNotFoundPage from './components/pages/PathNotFoundPage';
// history
import history from './history';
import routes from './history/routes';
// utils
import withProps from './utils/withProps';

/* map of pages for the routes */
const pageMap = {
  HomePage: SearchStartPage,
  ExplorerPage,
  AboutPage,
  SignInPage,
  SignUpPage,
};

/**
 * gets an array of routes that can be put into a router statement.
 *
 * @param intl internationalization object that shall be used.
 * @param app stored state of the app.
 * @return {Array} an array of routes that can be put into a router statement.
 */
const getRoutes = ({ intl, app }) => {
  const routeComponents = [];
  Object.entries(routes).forEach((entry) => {
    const [key, value] = entry;
    if (value && value.handler && value.handler in pageMap) {
      routeComponents.push((
        <Route
          key={`route-${key}`}
          path={value.route}
          component={withProps(pageMap[value.handler], { intl, app })}
          exact={value.exact ? true : undefined}
        />
      ));
    }
  });
  routeComponents.push((
    <Route key="route-notfound" component={withProps(PathNotFoundPage, { intl, app })} />
  ));
  return routeComponents;
};

/**
 * This React component is the entry point to the App presentation. It
 * switches to components based on the path that the user visited. In
 * the case that no route matches, a 404 not found page will be shown.
 */
function App(props) {
  return (
    <Router history={history}>
      <Switch>
        {getRoutes(props)}
      </Switch>
    </Router>
  );
}

export default App;
