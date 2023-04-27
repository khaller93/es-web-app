const pattern = /^((.*[:#/])(.*[^:#/])[:#/])([^:#/]*)$/;

/**
 * extracts prefix information from the given iri.
 *
 * @param iri for which the prefix info shall be extracted.
 * @return {*} null, if the prefix cannot be extracted, otherwise an object
 * with the prefix name, the prefix iri and the value.
 */
export default function extractPrefix(iri) {
  if (iri) {
    const match = pattern.exec(iri);
    return {
      prefixIRI: match[1],
      prefix: match[3],
      value: match[4],
    };
  }
  return null;
}
