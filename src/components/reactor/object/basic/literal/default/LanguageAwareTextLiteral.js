import React from "react";
import Typography from "@material-ui/core/Typography";


/**
 *
 */
const LanguageAwareTextLiteral = ({role, mode, value, languageTag, intl}) => {
    return languageTag && languageTag === intl.locale ? (
        <Typography component="span">
            {value}
        </Typography>
    ) : null;
};

export default LanguageAwareTextLiteral;