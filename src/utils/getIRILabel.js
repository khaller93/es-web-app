const pattern = /^(.*[:#/])([^:#/]*)$/;

/**
 * tries to get a meaningful label for a IRI by inspecting
 * the last part of the given IRI. Strings after the last
 * '#', '/', and ':' are considered as the name.
 *
 * @param iri of which a meaningful name shall be extracted.
 * @return {*} name based on the last part of the IRI.
 */
export default function (iri) {
  if (iri) {
    const match = pattern.exec(iri);
    if (match && match.length > 2) {
      return match[2];
    }
  }
  return null;
}
