import React from "react";
import {FormattedMessage} from "react-intl";
import Typography from "@material-ui/core/Typography";

/**
 *
 */
const BooleanLiteral = ({role, mode, value, intl}) => {
    return value !== undefined && value !== null ? (
        <Typography component="span">
            {value ? <FormattedMessage id="app.literal.boolean.true"/> :
                <FormattedMessage id="app.literal.boolean.false"/>}
        </Typography>
    ) : null;
};

export default BooleanLiteral;