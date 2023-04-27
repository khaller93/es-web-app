import React from "react";
import {animated, useSpring} from "react-spring";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";

/**
 *
 *
 * @param props
 */
const TransitionComponent = (props) => {
    const style = useSpring({
        from: {opacity: 0, transform: 'translate3d(20px,0,0)'},
        to: {opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)`},
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    in: PropTypes.bool,
};

export default TransitionComponent;

