import React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles, Menu} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import intLabelInMap from "../../../configuration/intLabelInMap";

const styles = makeStyles(theme => ({
    'roleMenuItem': {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        textTransform: 'uppercase'
    },
    'roleIcon': {
        marginRight: theme.spacing(0.5),
    }
}));

/**
 * This React element is intended to show the currently activated role and
 * provides a way to switch to another by clicking on this menu.
 *
 * @param activeRole id of the role that is currently activated.
 * @param supportedRoles supported roles to which the user is able to switch.
 * @param onRoleChanged function that is triggered, if another role is selected.
 * @param intl internationalization object.
 */
const RoleMenu = ({activeRole, supportedRoles, onRoleChanged, intl}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    /**
     * this method handles the request of opening the role menu.
     *
     * @param event of the opening click.
     */
    const handleMenuOpened = (event) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
    };

    /**
     * this method handles the closure of the role menu.
     */
    const handleMenuClosed = () => {
        setAnchorEl(null);
    };

    /**
     * handles the selection of a new role.
     *
     * @param role that has been selected.
     */
    const handleRoleChange = (role) => {
        if (onRoleChanged) {
            if (role && role !== activeRole) {
                onRoleChanged(role);
            }
        }
        handleMenuClosed();
    };

    const supportedRoleList = Object.keys(supportedRoles);
    const classes = styles();
    return (
        <div>
            <Button aria-controls="roles-menu" aria-haspopup="true" color="inherit" size="medium"
                    onClick={handleMenuOpened}>
                <PersonIcon className={classes.roleIcon}/>
                {activeRole in supportedRoles ? intLabelInMap(supportedRoles[activeRole].name, intl) : (
                    activeRole === '_' ? intl.formatMessage({
                        id: 'app.menu.role.general',
                    }) : null
                )}
            </Button>
            {supportedRoleList && supportedRoleList.length > 1 ?
                <Menu
                    id="roles-menu"
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClosed}
                >
                    {Object.keys(supportedRoles).map(roleId => {
                        return (
                            <MenuItem key={'role-menu-' + roleId} className={classes.roleMenuItem}
                                      onClick={() => handleRoleChange(roleId)}>{intLabelInMap(supportedRoles[roleId].name, intl)}</MenuItem>
                        );
                    })}
                </Menu> : null}
        </div>
    );
};
//

RoleMenu.propTypes = {
    activeRole: PropTypes.string.isRequired,
    supportedRoles: PropTypes.object.isRequired,
    onRoleChanged: PropTypes.func,
    intl: PropTypes.any.isRequired,
};

export default RoleMenu;