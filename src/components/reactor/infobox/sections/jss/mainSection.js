import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cardHead: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  boxDescription: {
    marginTop: '1em',
  },
  gallery: {
    marginLeft: 'auto',
    height: '15rem',
    maxWidth: '20vh',
  },
  classSeparator: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  segmentTitle: {
    marginRight: theme.spacing(1.5),
  },
  segmentGrid: {
    margin: theme.spacing(2),
  },
}));
