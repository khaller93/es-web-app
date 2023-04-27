import React from "react";
import typeSpecificEntryInMap from "../../../../../configuration/utils/typeSpecificEntryInMap";
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import RDFTermReactor from "../../RDFTermReactor";
import Link from "@material-ui/core/Link";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(5),
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    link: {
        cursor: 'pointer'
    }
}));

const getConfig = (object, getReactorConfigEntry) => (config) => {
    const xConf = getReactorConfigEntry(config);
    if (xConf && xConf.object) {
        return object.type === 'iri' ?
            typeSpecificEntryInMap(xConf.object, 'iri') : typeSpecificEntryInMap(xConf.object, 'literal');
    }
    return null;
};

const BasicList = ({role, mode, objects, getReactorConfigEntry, config: {show = 3}, intl}) => {
    const [more, setMore] = React.useState(false);

    const classes = useStyles();

    let objectList = !more ? objects.slice(0, show) : [...objects];
    return <List component="li" className={classes.root} aria-label="contacts">
        {more && objects.length > show && (
            <ListItem>
                <Link className={classes.link} onClick={() => setMore(false)} color="inherit">
                    <FormattedMessage id="app.infobox.show-less"/>
                </Link>
            </ListItem>
        )}
        {objectList.map((object, index) => {
            return <ListItem key={index}>
                <RDFTermReactor key={index} role={role} mode={mode} term={object}
                                getReactorConfigEntry={getConfig(object, getReactorConfigEntry)} intl={intl}/>;
            </ListItem>
        })}
        {!more && objects.length > show && (
            <ListItem>
                <Link className={classes.link} onClick={() => setMore(true)} color="inherit">
                    <FormattedMessage id="app.infobox.show-more"/>
                </Link>
            </ListItem>
        )}
    </List>;
}

export default BasicList;