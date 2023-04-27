import getIRILabel from "../../utils/getIRILabel";

/**
 * gets the name of this resource for the given language tags. Should be
 * no language tags given, default/locale is assumed. Given a list of
 * language tags, this method iterates over the list and returns
 * the name in the language that could be found first.
 *
 * If no label can be found, it is generated automatically from the
 * resource IRI.
 *
 * @param iri of the resource for which the name shall be extracted.
 * @param values object holding the resource state.
 * @param intl internationalization object, which should be considered.
 * @return {string} name of this resource, or null, if all attempts of
 * getting a description failed.
 */
export function name(iri, values, intl) {
    if (values && values.description && values.description.label) {
        const labelValues = values.description.label;
        const languageTags = [intl.locale, intl.defaultLocale];
        for (let i = 0; i < languageTags.length; i++) {
            let vals = labelValues[languageTags[i]];
            if (vals) {
                vals = [...vals.filter(t => !!t)];
                if (vals.length > 0) {
                    return vals[0];
                }
            }
        }
        let vals = labelValues['_'];
        if (vals) {
            vals = [...vals.filter(t => !!t)];
            if (vals.length > 0) {
                return labelValues['_'][0];
            }
        }
    }
    return getIRILabel(iri);
}

/**
 * gets the description of this resource for the given language tags. Should be
 * no language tags given, default/English is assumed. Given a list of
 * language tags, this method iterates over the list and returns
 * the description in the language that could be found first. Thus, the order
 * of the given language tags is important.
 *
 * @param values object holding the resource state.
 * @param intl internationalization object, which should be considered.
 * @return {{}} description of this resource, or null, if all attempts of
 * getting a description failed.
 */
export function description(values, intl) {
    if (values && values.description && values.description.description) {
        const descriptionValues = values.description.description;
        const languageTags = [intl.locale, intl.defaultLocale];
        for (let i = 0; i < languageTags.length; i++) {
            if (descriptionValues[languageTags[i]]) {
                return descriptionValues[languageTags[i]][0];
            }
        }
        if (descriptionValues['_']) {
            return descriptionValues['_'][0];
        }
    }
    return null;
}

/**
 * gets depictions of this resource that are known.
 *
 * @param values object holding the resource state.
 * @return {[Value]} a list of all known depictions, or an empty list, if
 * none can be found.
 */
export function depictions(values) {
    if (values && values.description && values.description.depiction) {
        return values.description.depiction;
    }
    return null;
}

/**
 *
 * @param values
 */
export function getSpecificClasses(values) {
    if (values && values.classInfo && values.classInfo.specific) {
        return values.classInfo.specific;
    }
    return null;
}