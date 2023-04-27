const key = '__main__';

/**
 * extract the config of the main section from the sections config.
 *
 * @param config of the sections.
 */
export default function defaultSection(config) {
  return config && key in config ? config[key] : null;
}
