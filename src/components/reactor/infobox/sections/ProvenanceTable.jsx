import React from 'react';
import * as PropTypes from 'prop-types';
// material ui components
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
// ESS elements
import RDFTermReactor from '../../object/RDFTermReactor';
import ResourceComponent from '../../object/basic/resource/ResourceComponent';
import BasicResourceLinkView from '../../object/basic/resource/BasicResourceLinkView';
import ImageResourceLinkView from '../../object/basic/resource/ImageResourceLinkView';
import PropertyLinkView from '../../object/basic/resource/ProperryLinkView';
// ESS section
import BasicSectionComponent from './BasicSectionComponent';
// redux actions
import { fetchNeighbourhood } from '../../../../actions/resources';
// types
import sectionConfigType from '../../../../types/section/sectionConfig';
// styles
import provenanceTableStyles from './jss/provenanceTable';

/* constructs the provenance matrix */
const getMatrix = (neighbourhood) => {
  if (neighbourhood && neighbourhood.props) {
    const namespaces = new Set([]);
    const matrixMap = {};
    for (const prop in neighbourhood.props) {
      matrixMap[prop] = {};
      const terms = neighbourhood.props[prop];
      if (terms) {
        for (let t = 0; t < terms.length; t += 1) {
          let ns = terms[t].namespaces;
          if (ns) {
            ns = terms[t].namespaces.filter((r) => r.type === 'iri').map((r) => r.value);
            for (let n = 0; n < ns.length; n += 1) {
              namespaces.add(ns[n]);
              if (!matrixMap[prop][ns[n]]) {
                matrixMap[prop][ns[n]] = [];
              }
              matrixMap[prop][ns[n]].push(terms[t]);
            }
          }
        }
      }
    }
    return {
      namespaces: [...namespaces],
      matrix: matrixMap,
      properties: Object.keys(neighbourhood.props),
    };
  }
  return {};
};

/**
 * This React element implements a provenance table. This table has the
 * original source of a fact as columns, and for a set of properties,
 * the objects that come from an original source are displayed in the
 * corresponding column.
 *
 * @param id of this section.
 * @param iri for which this section is displayed.
 * @param role currently active role.
 * @param mode 'view' or 'edit'.
 * @param values for the resource
 * @param intl internationalization object.
 */
function ProvenanceTableContent({
  id, role, mode, values, intl,
}) {
  const classes = provenanceTableStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /**
   * handles the change of the page by the user.
   *
   * @param event that is triggered, if the user changes
   * the page.
   * @param newPage new page to which the result shall be
   * switched.
   */
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  /**
   * handles the event that is triggered, if the number of results
   * per page is changed by the user.
   *
   * @param event that is triggered, if the number of results
   * per page is changed by the user.
   */
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { namespaces, matrix, properties } = getMatrix(values.neighbourhood[id]);
  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.firstColumn} />
            {namespaces && namespaces.map((ns) => (
              <TableCell
                key={ns}
                align="center"
              >
                <ResourceComponent
                  mode={mode}
                  component={BasicResourceLinkView}
                  iri={ns}
                  role={role}
                  intl={intl}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {properties && properties.slice(page * rowsPerPage,
            page * rowsPerPage + rowsPerPage).map((prop) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={prop}>
                <TableCell
                  key={'main' - prop}
                  align="center"
                  className={classes.firstColumn}
                >
                  <ResourceComponent
                    mode={mode}
                    component={PropertyLinkView}
                    iri={prop}
                    role={role}
                    intl={intl}
                  />
                </TableCell>
                {namespaces.map((ns) => {
                  const entries = matrix[prop] ? matrix[prop][ns] : null;
                  return (
                    <TableCell key={`${prop}-${ns}`} align="center">
                      {entries ? (entries[0].type === 'literal'
                        ? (
                          <RDFTermReactor
                            mode={mode}
                            role={role}
                            term={entries[0]}
                            intl={intl}
                            getReactorConfigEntry={() => {
                            }}
                          />
                        ) : (
                          <ResourceComponent
                            mode={mode}
                            component={ImageResourceLinkView}
                            iri={entries[0].value}
                            role={role}
                            intl={intl}
                          />
                        )) : null}
                    </TableCell>
                  );
                })}
              </TableRow>
          ))}
        </TableBody>
        {properties && properties.length > 5 ? (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={properties.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </Paper>
  );
}

ProvenanceTableContent.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  intl: PropTypes.instanceOf(Intl).isRequired,
};

/* fetch the neighbourhood for the provenance table */
function fetch(id, role, values, config, iri, dispatch) {
  return () => {
    dispatch(fetchNeighbourhood({
      iri,
      role,
      config: {
        includedProperties: config.neighbourhood.include,
        excludedProperties: config.neighbourhood.exclude,
        provenance: config.provenance,
      },
      id,
    }));
  };
}

/* checks whether the provenance table has been loaded successfully */
function check(id) {
  return (values) => (values && values.neighbourhood && values.neighbourhood[id]
  && values.neighbourhood[id].status ? values.neighbourhood[id].status : {});
}

/**
 *
 */
function ProvenanceTable(props) {
  const {
    id, iri, role, reactor, values, dispatch,
  } = props;

  return (
    <BasicSectionComponent
      section={ProvenanceTableContent}
      sectionProps={props}
      fetch={fetch(id, role, values, { ...reactor, provenance: true }, iri, dispatch)}
      check={check(id)}
      values={values}
    />
  );
}

ProvenanceTable.propTypes = {
  id: PropTypes.string.isRequired,
  iri: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  reactor: sectionConfigType.isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ProvenanceTable;
