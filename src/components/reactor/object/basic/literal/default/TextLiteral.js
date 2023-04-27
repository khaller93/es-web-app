import React from "react";
import Typography from "@material-ui/core/Typography";


/**
 *
 */
const TextLiteral = ({role, mode, value, languageTag, intl}) => {
    return (
        <Typography component="span">
            {value}
        </Typography>
    );
};

export default TextLiteral;