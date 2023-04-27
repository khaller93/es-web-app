import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  root: {},
  searchBox: {
    position: 'absolute',
    top: '40vh',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'translateY(-50%)',
  },
  searchPageHeaderBox: {
    textAlign: 'center',
  },
  categoryNav: {
    marginBottom: theme.spacing(0.75),
  },
  searchPageHeader: {
    height: '12rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sparqlEditIcon: {
    marginRight: theme.spacing(0.75),
  },
  treeViewIcon: {
    marginRight: theme.spacing(0.75),
  },
  facetBox: {
    marginTop: theme.spacing(1),
  },
}));
