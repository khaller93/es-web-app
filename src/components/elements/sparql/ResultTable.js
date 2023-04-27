import React from "react";
import Clipboard from 'react-clipboard.js';
import * as PropTypes from "prop-types";
import {Button, makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import RDFTermReactor from "../../reactor/object/RDFTermReactor";
import typeSpecificEntryInMap from "../../../configuration/utils/typeSpecificEntryInMap";
import widgetSpecificEntryInMap from "../../../configuration/utils/widgetSpecificEntryInMap";
import ResourceComponent from "../../reactor/object/basic/resource/ResourceComponent";
import PrefixResourceLinkView from "../../reactor/object/basic/resource/PrefixResourceLinkView";
import BasicResourceLinkView from "../../reactor/object/basic/resource/BasicResourceLinkView";

/* styles for the table */
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableHead: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCell: {
        textAlign: 'center',
    },
    downloadIcon: {
        paddingRight: '0.25rem'
    },
    copyButton: {
        padding: theme.spacing(0, 1),
        marginLeft: '0.25rem',
        minWidth: 0,
        color: 'lightgrey',
        float: 'right',
        '&:hover': {
            color: theme.palette.secondary.main,
        }
    }
}));

/**
 * gets the string representation of the given term
 * that will be eventually copied to clipboard.
 *
 * @param term that shall be copied.
 */
function getCopyOf(term) {
    if (term.type === 'iri' || term.type === 'uri') {
        return term.value;
    } else if (term.type === 'literal') {
        let text = '"' + term.value + '"';
        if (term.datatype) {
            text = '^^' + term.datatype;
        } else if (term['xml:lang']) {
            text += '@' + term['xml:lang'];
        }
        return text;
    }
    return '';
}

const getComp = (iri) => {
    if (iri.includes('data.ifs') || iri.includes('pokemonkg') || iri.includes("siemens")) {
        return BasicResourceLinkView;
    } else {
        return PrefixResourceLinkView;
    }
}

/**
 * This React element is intended to visualize SELECT, DESCRIBE, and CONSTRUCT query
 * results for SPARQL in a table form.
 *
 * @param role active role.
 * @param columns a list of variables for which values will be returned.
 * @param bindings a list fo rows with the values for the columns.
 * @param intl object for internationalization.
 */
const ResultTable = ({role, columns, bindings, intl}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, bindings.length - page * rowsPerPage);

    /**
     * handles the change of the page by the user.
     *
     * @param event that is triggered, if the user changes
     * the page.
     * @param newPage new page to which the result shall be
     * switched.
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    /**
     * function for extracting the reactor config entry.
     *
     * @param type of the RDF term.
     * @return {Function} function for extracting the reactor config entry.
     */
    const getReactorConfigEntry = type => {
        return (config) => {
            if (config) {
                return typeSpecificEntryInMap(widgetSpecificEntryInMap(config, "sparql"), type === 'uri' ? 'iri' : type);
            }
            return {};
        };
    };

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns ? columns.map((col, colindex) => (
                                <TableCell className={classes.tableHead} align="right"
                                           key={'sparql-result-head-row-' + colindex}>{col}</TableCell>
                            )) : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bindings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={'sparql-table-row-' + index}>
                                {columns ? columns.map((col, colindex) => (
                                    <TableCell key={'sparql-result-table-row' + colindex} className={classes.tableCell}
                                               align="right">
                                        {row[col] ?
                                            <React.Fragment>
                                                {row[col].type === 'iri' || row[col].type === 'uri' ?
                                                    <ResourceComponent mode="view" component={getComp(row[col].value)}
                                                                       iri={row[col].value} role={role}
                                                                       intl={intl}/> : null}
                                                {row[col].type === 'literal' ?
                                                    <RDFTermReactor mode="view" term={row[col]} role={role}
                                                                    getReactorConfigEntry={() => ({
                                                                        'object_handler': 'VerboseLiteral'
                                                                    })} intl={intl}/> : null}
                                                {/*<RDFTermReactor mode="view" role={role} term={row[col]} intl={intl}/>*/}
                                                <Clipboard component={Button} data-clipboard-text={getCopyOf(row[col])}
                                                           className={classes.copyButton}>
                                                    <FileCopyIcon/>
                                                </Clipboard>
                                            </React.Fragment>
                                            : null}
                                    </TableCell>
                                )) : null}
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 48 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={bindings.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleRowsPerPageChange}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </Paper>
    );
};

ResultTable.propTypes = {
    role: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    bindings: PropTypes.array.isRequired,
    intl: PropTypes.object.isRequired,
};

export default ResultTable;