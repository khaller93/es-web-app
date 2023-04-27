import React from "react";
import numeral from 'numeral';
import Typography from "@material-ui/core/Typography";

const Decimal = ({value, intl}) => {
    numeral.locale(intl.locale);
    return <Typography component="span">
        {numeral(value)}
    </Typography>
}

const Integer = ({value, intl}) => {
    numeral.locale(intl.locale);
    return <Typography component="span">
        {numeral(value)}
    </Typography>
}

const NumberLiteral = (type) => (props) => {
    switch (type) {
        case 'decimal':
            return <Decimal {...props} />;
        case 'integer':
            return <Integer {...props} />;
        default:
            return <Typography component="span" color="secondary">Wrongly configured!</Typography>;
    }
};

export default NumberLiteral;