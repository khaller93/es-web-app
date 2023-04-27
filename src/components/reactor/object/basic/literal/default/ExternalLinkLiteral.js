import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/styles";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
    link: {
        color: green['500']
    }
}));

/**
 *
 */
const ExternalLinkLiteral = ({value}) => {
    const classes = useStyles();

    return value ? (
        <Link href={value} className={classes.link}>
            {value}
        </Link>
    ) : null;
};

export default ExternalLinkLiteral;