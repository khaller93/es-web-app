/**
 * returns the label corresponding to the current locale in the map. If
 * there is no such match, then an entry for the default locale is
 * returned. Should no entry be found in the two previous attempts, then
 * null will be returned.
 *
 *
 * @param map internationalization map.
 * @param intl object that contains the internationalization information.
 * @return {*} corresponding label, or null, if no matching label could
 * be found in the given map.
 */
export default function intLabelInMap(map, intl) {
    if (map && intl) {
        const locale = intl.locale;
        if (locale && locale in map) {
            return map[locale];
        }
        const defaultLocale = intl.defaultLocale;
        if (defaultLocale && defaultLocale in map) {
            return map[defaultLocale];
        }
    }
    return null;
}