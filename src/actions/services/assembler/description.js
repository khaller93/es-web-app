/**
 * expects a configuration object that specifies the properties
 * that shall be used for gathering label, description and
 * potentially also depictions. This method assembles an ESM
 * description step based on this configuration.
 *
 * @param config for the description.
 * @param supportedLanguages a list of language codes that shall be
 * considered.
 * @return {{}} description step based on the given configuration.
 */
export function prepareDescriptionStep(config, supportedLanguages) {
    const describerStep = {
        name: 'esm.exploit.describe',
        param: {
            content: {
                label: {
                    '@type': 'text',
                    properties: ['http://www.w3.org/2000/01/rdf-schema#label']
                },
                description: {
                    '@type': 'text',
                    properties: ['http://www.w3.org/2000/01/rdf-schema#comment']
                },
            }
        }
    };
    /* specify languages */
    const langs = ['default'];
    if (supportedLanguages && supportedLanguages.length > 0) {
        langs.push(...supportedLanguages)
    }
    describerStep.param.content.label.languages = langs;
    describerStep.param.content.description.languages = langs;
    /* set the properties for label and description */
    if (config) {
        if (config.label) {
            describerStep.param.content.label.properties = config.label;
        }
        if (config.description) {
            describerStep.param.content.description.properties = config.description;
        }
        /* potentially add depiction properties */
        if (config.depiction && config.depiction.length > 0) {
            describerStep.param.content['depiction'] = {
                '@type': 'iri',
                properties: config.depiction
            };
        }
    }
    return describerStep;
}