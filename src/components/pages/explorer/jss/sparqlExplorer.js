import { green } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
  },
  controlBox: {
    marginTop: theme.spacing(1),
    float: 'right',
    display: 'flex',
    alignItems: 'center',
  },
  controlBoxWrapper: {
    float: 'right',
    position: 'relative',
  },
  resultBox: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  /* query button */
  queryButtonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  queryButtonFailed: {
    backgroundColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
  queryFabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,

  },
  queryButtonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  treeViewIcon: {
    marginRight: theme.spacing(0.75),
  },
}));
