import React from "react";
import {FormattedTime} from "react-intl";
import Typography from "@material-ui/core/Typography";

import 'datejs/index';
import moment from "moment";


/**
 *
 */
const TimeLiteral = ({role, mode, value, intl}) => {
    moment.locale(intl.locale)
    return value ? (
        <Typography component="span">
            <FormattedTime value={moment(value).format('LLLL')}/>
        </Typography>
    ) : null;
};

export default TimeLiteral;