export default {
  /* start page */
  Home: {
    handler: 'HomePage',
    exact: true,
    route: '/',
  },
  /* about */
  About: {
    handler: 'AboutPage',
    route: '/about',
  },
  /* sign in page */
  SignIn: {
    handler: 'SignInPage',
    route: '/signin',
  },
  /* sign up page */
  SignUp: {
    handler: 'SignUpPage',
    route: '/signup',
  },
  Explorer: {
    handler: 'ExplorerPage',
    route: '/explore/with/:method',
  },
  Instance: {
    handler: 'InstancePage',
    route: '/explore/instance',
  },
};
