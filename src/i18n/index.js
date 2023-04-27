import messages_en from "./translations/en.json";
import messages_de from "./translations/de.json";

const messages = {
    'en': messages_en,
    'de': messages_de
};

/**
 * gets the timezone of the user, or null, if it cannot be
 * parsed.
 *
 * @return {*}  gets the timezone of the user, or null, if it cannot be
 * parsed.
 */
export function getTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
        return null;
    }
}

/**
 * gets the locale (ISO 639-1) for the agent running this app.
 *
 * @return {string} locale (ISO 639-1) for the agent running this app.
 */
export function getLocale() {
    return navigator.language;
}

/**
 * gets the base language encoded in the locale (ISO 639-1) for the agent running this app.
 *
 * @return {*}  base language encoded in the locale (ISO 639-1) for the agent running this app.
 */
export function getBaseLanguage() {
    const locale = getLocale();
    if (locale) {
        return locale.split(/[-_]/)[0];
    }
    return null;
}

/**
 * returns the messages in the language of the given locale, if messages
 * in this language are available. Otherwise, null will be returned.
 *
 * @param locale for which the messages shall be returned.
 * @return {*}
 */
export function getMessages(locale) {
    if (locale) {
        const code = locale.split(/[-_]/)[0];
        if (code && code in messages) {
            return messages[code];
        }
    }
    return null;
}


