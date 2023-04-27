import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Pagination from 'material-ui-flat-pagination';
import { makeStyles } from '@material-ui/core';
import SESnippetView from '../basic/SESnippetView';
import ResourceComponent from '../basic/resource/ResourceComponent';
import { navigateToExploration } from '../../../../history/navigation';

/* styles for the result list */
const styles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getCurrentPage = (start, pagination) => Math.floor(start / (pagination.resultsPerPage ? pagination.resultsPerPage : 10));

const sliceResultList = (list, start, pagination) => list.slice(start,
  (getCurrentPage(start,
    pagination) + 1) * (pagination.resultsPerPage ? pagination.resultsPerPage : 10));

/**
 *
 */
const SEResultList = ({
  role, esState, resultList, start = 0, pagination = { resultsPerPage: 10 }, total, intl, className,
}) => {
  /**
   * switches to the page with the given offset as it was
   * requested by the user-
   *
   * @param offset to which the result shall be switched.
   */
  const switchPage = (offset) => {
    navigateToExploration(esState, { start: offset });
  };

  if (resultList) {
    const classes = styles();
    return (
      <Grid container className={className}>
        {resultList && resultList.length > 0 ? sliceResultList(resultList, start, pagination)
          .map((iri, index) => (
            <Grid key={`sr-index-${index + 1}`} item xs={12}>
              <ResourceComponent
                role={role}
                mode="view"
                iri={iri}
                component={SESnippetView}
                componentProps={{ maxLength: 256 }}
                intl={intl}
              />
            </Grid>
          )) : null}
        <Grid key="se-pagination" item xs={12}>
          {total > pagination.resultsPerPage
            ? (
              <Pagination
                className={classes.pagination}
                limit={pagination.resultsPerPage}
                offset={start}
                total={total}
                onClick={(e, offset) => switchPage(offset)}
              />
            )
            : null}
        </Grid>
      </Grid>
    );
  }
  return null;
};

SEResultList.propTypes = {
  role: PropTypes.string.isRequired,
  esState: PropTypes.any.isRequired,
  resultList: PropTypes.any.isRequired,
  start: PropTypes.number,
  total: PropTypes.number.isRequired,
  intl: PropTypes.any.isRequired,
};

export default SEResultList;
