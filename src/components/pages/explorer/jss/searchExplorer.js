import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  searchBox: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderBottom: '2px solid lightgrey',
  },
  searchBar: {
    marginBottom: theme.spacing(1),
  },
  searchBoxNav: {
    marginBottom: '-2px',
  },
  searchInfoBox: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(3),
    height: '1em',
  },
  loadingBar: {
    marginLeft: theme.spacing(-3),
  },

  searchResultBox: {
    paddingLeft: theme.spacing(3),
  },
  sparqlEditIcon: {
    marginRight: theme.spacing(0.75),
  },
  treeViewIcon: {
    marginRight: theme.spacing(0.75),
  },
}));
