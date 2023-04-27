import React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";
import {makeStyles, Menu} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

/* styles for this language menu */
const styles = makeStyles(theme => ({
    'languageMenuItem': {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        textTransform: 'uppercase'
    },
    'langIcon': {
        marginRight: theme.spacing(0.5),
    }
}));

/**
 * This React element is intended to show up the currently selected
 * language and by clicking on it, the language can be changed to
 * another supported one.
 *
 * @param language that is currently selected.
 * @param supportedLanguages a list of languages that are supported in this app.
 * @param onLanguageChanged function that is triggered, if a new language has been selected.
 * @param intl object for internationalization.
 */
const LanguageMenu = ({language, supportedLanguages, onLanguageChanged, intl}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    /**
     * this method handles the request of opening the language menu.
     *
     * @param event of the opening click.
     */
    const handleMenuOpened = (event) => {
        if (event) {
            setAnchorEl(event.currentTarget);
        }
    };

    /**
     * this method handles the closure of the language menu.
     */
    const handleMenuClosed = () => {
        setAnchorEl(null);
    };

    /**
     * handles the selection of a new language.
     *
     * @param lang that has been selected.
     */
    const handleLanguageChange = (lang) => {
        if (onLanguageChanged) {
            if (lang && lang !== language) {
                onLanguageChanged(lang);
            }
        }
        handleMenuClosed();
    };

    const classes = styles();
    return (
        <div>
            <Button aria-controls="language-menu" aria-haspopup="true" color="inherit" size="medium"
                    onClick={handleMenuOpened}>
                <TranslateIcon className={classes.langIcon}/>
                {language ? language : "-"}
            </Button>
            {supportedLanguages && supportedLanguages.length > 1 ?
                <Menu
                    id="language-menu"
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClosed}
                >
                    {supportedLanguages.map(lang => {
                        return (
                            <MenuItem key={'lang-menu-' + lang} className={classes.languageMenuItem}
                                      onClick={() => handleLanguageChange(lang)}>{lang}</MenuItem>
                        );
                    })}
                </Menu> : null}
        </div>
    );
};

LanguageMenu.propTypes = {
    language: PropTypes.string.isRequired,
    supportedLanguages: PropTypes.array,
    onLanguageChanged: PropTypes.func,
    intl: PropTypes.any.isRequired,
};

export default LanguageMenu;
