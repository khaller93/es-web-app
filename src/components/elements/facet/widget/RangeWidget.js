import React from "react";
import Slider from "@material-ui/core/Slider";

const RangeWidget = ({predicate, values, intl}) => {
    return <Slider
        defaultValue={80}
       // getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={10}
       // marks={marks}
        valueLabelDisplay="on"
    />;
};

export default RangeWidget;