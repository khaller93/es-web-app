import React from "react";
import {FormattedMessage} from "react-intl";
import {makeStyles} from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import RDFTermReactor from "../../RDFTermReactor";
import typeSpecificEntryInMap from "../../../../../configuration/utils/typeSpecificEntryInMap";

const useStyles = makeStyles(theme => ({
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

/**
 *
 * @param role that is currently activated.
 * @param mode
 * @param objects
 * @param getReactorConfigEntry
 * @param show optional number of terms that shall be displayed, 5 per default.
 * @param intl internationalization object.
 */
const CommaSeparatedList = ({role, mode, objects, getReactorConfigEntry, config: {show = 5}, intl}) => {
    const [more, setMore] = React.useState(false);

    const classes = useStyles();
    if (objects && objects.length === 1) {
        return <RDFTermReactor role={role} mode={mode} term={objects[0]}
                               getReactorConfigEntry={getConfig(objects[0], getReactorConfigEntry)} intl={intl}/>
    } else if (objects.length > 1) {
        let objectList = !more ? objects.slice(0, show) : [...objects];
        return <React.Fragment>
            {more && objects.length > show && (
                <React.Fragment>
                    <Link className={classes.link} onClick={() => setMore(false)} color="inherit">
                        <FormattedMessage id="app.infobox.show-less"/>
                    </Link>
                    <span>, </span>
                </React.Fragment>
            )}
            {objectList.map((object, index) => {
                return <RDFTermReactor key={index} role={role} mode={mode} term={object}
                                       getReactorConfigEntry={getConfig(object, getReactorConfigEntry)} intl={intl}/>;
            }).filter(t => !!t).reduce((a, b) => <React.Fragment key={a.key + '-sep-' + b.key}>{a}<span>, </span>{b}
            </React.Fragment>)}
            {!more && objects.length > show && (
                <React.Fragment>
                    <span>, </span>
                    <Link className={classes.link} onClick={() => setMore(true)} color="inherit">
                        <FormattedMessage id="app.infobox.show-more"/>
                    </Link>
                </React.Fragment>
            )}
        </React.Fragment>
    }
    return null;
};


export default CommaSeparatedList;