import React from "react";
import InfoIcon from '@material-ui/icons/Info';
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import {makeStyles} from "@material-ui/core";
import intLabelInMap from "../../../configuration/intLabelInMap";

const styles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

/**
 * An information icon that displays information in the currently
 * selected language, when the mouse hovers over it.
 *
 * @param infoMap language map containing the popup information in different languages.
 * @param intl object for internationalization.
 */
const InfoPopupIcon = ({infoMap, intl}) => {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    if (infoMap && intl) {
        const description = intLabelInMap(infoMap, intl);
        if (description) {
            return (
                <React.Fragment>
                    <Typography
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        component="span"
                        color="textSecondary"
                    >
                        <InfoIcon/>
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography>{description}</Typography>
                    </Popover>
                </React.Fragment>
            );
        }
    }
    return null;
};

export default InfoPopupIcon;