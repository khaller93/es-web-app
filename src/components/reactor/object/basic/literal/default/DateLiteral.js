import React from "react";
import {FormattedDate} from "react-intl";
import Typography from "@material-ui/core/Typography";

import 'datejs/index';


/**
 *
 */
const DateLiteral = ({role, mode, value}) => {
    return value ? (
        <Typography component="span">
            <FormattedDate value={Date.parse(value)}/>
            Date
        </Typography>
    ) : null;
};

export default DateLiteral;