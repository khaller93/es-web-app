/**
 * switches the app to the given language, if it is supported,
 *
 * @param language to which the app shall be changed.
 * @return {{payload: {language: *}, type: string}} action payload for
 * changing the language.
 */
export function switchLanguage(language) {
    return {
        type: 'SWITCH_LANGUAGE',
        payload: {
            language: language,
        }
    }
}

/**
 * switches the app to the given role, if it is supported,
 *
 * @param role to which it shall be switched.
 * @return {{payload: {language: *}, type: string}} action payload for
 * changing the role.
 */
export function switchRole(role) {
    return {
        type: 'SWITCH_ROLE',
        payload: {
            role: role,
        }
    }
}