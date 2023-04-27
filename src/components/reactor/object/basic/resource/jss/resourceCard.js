import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    border: 'none',
    boxShadow: 'unset',
  },
  media: {
    height: '5em',
  },
  classSeparator: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));
