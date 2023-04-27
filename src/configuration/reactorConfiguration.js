import widgetSpecificEntryInMap from './utils/widgetSpecificEntryInMap';
import roleSpecificEntryInMap from './utils/roleSpecificEntryInMap';
import typeSpecificEntryInMap from './utils/typeSpecificEntryInMap';
import datatypeSpecificEntry from './utils/datatypeSpecificEntry';

/* map for caching regex expressions */
const regexMap = {};

/* method for escaping pattern keys for regex matching */
function escapeRegex(string) {
  return string.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * checks whether the given IRI matches the given pattern.
 *
 * @param iri which shall be checked.
 * @param pattern against which the IRI shall be checked.
 * @return {boolean} true, if given IRI matches, otherwise false.
 */
function matchPattern(iri, pattern) {
  const patternRegex = escapeRegex(pattern).replace('*', '.*');
  if (!regexMap[patternRegex]) {
    regexMap[patternRegex] = new RegExp(patternRegex);
  }
  return regexMap[patternRegex].test(iri);
}

/**
 * selects the right configuration from a list of successful matchings.
 *
 * @param contextClasses classes for which the configuration shall be fetched.
 * @param instanceOfConfig configuration from which the right parts shall be selected.
 * @param getFunction function for extracting the sought after part of selected configuration.
 * @return {*} selected configuration.
 */
function selectInstanceOfConfig(contextClasses, instanceOfConfig, getFunction) {
  if (contextClasses && instanceOfConfig && getFunction) {
    const matchingList = [];
    for (let i = 0; i < contextClasses.length; i++) {
      if (instanceOfConfig[contextClasses[i]]) {
        matchingList.push({
          id: contextClasses[i],
          config: instanceOfConfig[contextClasses[i]],
        });
      }
    }
    if (matchingList.length === 1) {
      return getFunction(matchingList[0].config);
    }
    /* fill */
    const matchDict = {};
    for (let n = 0; n < matchingList.length; n++) {
      matchDict[matchingList[n].id] = getFunction(matchingList[n].config);
    }
    /* eliminate */
    for (let n = 0; n < matchingList.length; n++) {
      const conf = matchingList[n].config;
      if (conf && conf.precedence_over) {
        for (let p = 0; p < conf.precedence_over.length; p++) {
          delete matchDict[conf.precedence_over[p]];
        }
      }
    }
    return Object.assign({}, ...Object.values(matchDict));
  }
  return {};
}

/**
 * gets the suiting reactor config for the resource with
 * the given IRI. This method never returns null or undefined,
 * but might return an empty object.
 *
 * @param iri for which the suiting reactor configuration shall be fetched.
 * @param role currently active role.
 * @param config from which the suiting part shall be extracted.
 * @param context for getting the configuration.
 * @param getFunction function to extract the sought after part of the
 * configuration.
 */
export function resource(iri, role, config, context, getFunction, code) {
  if (iri && config && getFunction) {
    if (config.pattern) {
      const patterns = Object.keys(config.pattern);
      for (let i = 0; i < patterns.length; i++) {
        if (matchPattern(iri, patterns[i])) {
          return getFunction(config.pattern[patterns[i]]);
        }
      }
    }
    if (config.instance_of) {
      let contextClasses;
      if (context && context.classes) {
        contextClasses = context.classes;
        if (!contextClasses.includes('http://www.w3.org/2000/01/rdf-schema#Resource')) {
          contextClasses.push('http://www.w3.org/2000/01/rdf-schema#Resource');
        }
      } else {
        contextClasses = ['http://www.w3.org/2000/01/rdf-schema#Resource'];
      }
      return selectInstanceOfConfig(contextClasses, config.instance_of, getFunction);
    }
  }
  return {};
}

/**
 * gets the infobox configuration for the resource identified by
 * the given IRI.
 *
 * @param reactorConfig configuration object from which relevant
 * part shall be extracted.
 * @param iri for which the infobox configuration shall be returned.
 * @param role currently active role.
 * @param context of the IRI such as classes.
 * @return {{}} infobox configuration for the given IRI.
 */
export function resourceForInfobox(reactorConfig, iri, role, context) {
  return resource(iri,
    role,
    reactorConfig,
    context,
    (config) => roleSpecificEntryInMap(widgetSpecificEntryInMap(config, 'infobox'), role));
}

/**
 * gets the treeview configuration for the resource identified by
 * the given IRI.
 *
 * @param reactorConfig configuration object from which relevant
 * part shall be extracted.
 * @param iri for which the infobox configuration shall be returned.
 * @param role currently active role.
 * @param context of the IRI such as classes.
 * @return {{}} tree view configuration for the given IRI.
 */
export function resourceForTreeView(reactorConfig, iri, role, context) {
  return resource(iri,
    role,
    reactorConfig,
    context,
    (config) => roleSpecificEntryInMap(widgetSpecificEntryInMap(config, 'treeview'), role));
}

/**
 * gets the suiting reactor config for the given literal. This
 * method never returns null or undefined, but might return
 * an empty object.
 *
 * @param value text of the literal.
 * @param datatype of the literal.
 * @param language tag of the literal.
 * @param role currently active role.
 * @param config from which the fitting configuration shall be extracted.
 * @return {{}} suiting configuration for the given literal in the given configuration.
 */
export function literal(value, datatype, language, role, config) {
  if (config) {
    return roleSpecificEntryInMap(datatypeSpecificEntry(config, datatype), role);
  }
  return {};
}

/**
 * gets the suiting reactor config for the property with
 * the given IRI. This method never returns null or undefined,
 * but might return an empty object.
 *
 * @param propertyIRI IRI of the property.
 * @param context for the property identified by given IRI.
 * @param role currently active role.
 * @param resourceIRI  IRI of the subject resource at which given property was found.
 * @param resourceContext context of the resource.
 * @param config from which the fitting configuration shall be extracted.
 * @return {{}} suiting configuration for the property identified by the given IRI.
 */
export function property(propertyIRI, context, role, resourceIRI, resourceContext, config) {
  if (config) {
    const resourceConfig = resource(resourceIRI, role, config, resourceContext);
    if (resourceConfig && resourceConfig.properties) {
      /* const propertiesConfig = resourceConfig.properties;
      const matchings = [];
          if (propertiesConfig.pattern) {
               const patterns = Object.keys(propertiesConfig.pattern);
               for (let i = 0; i < patterns.length; i++) {
                   if (matchPattern(propertyIRI, patterns[i])) {
                       matchings.push({
                           id: 'p:' + patterns[i],
                           config: propertiesConfig.pattern[patterns[i]],
                       });
                   }
               }
           }
           return selectConfig(matchings); */
    }
  }
  return {};
}

/**
 *
 * @param reactorConfig
 * @param propertyIRI
 * @param context
 * @param role
 * @param resourceIRI
 * @param resourceContext
 * @return {{}}
 */
export function propertyForInfoBox(reactorConfig, propertyIRI, context, role, resourceIRI, resourceContext) {
  return property(propertyIRI,
    context,
    role,
    resourceIRI,
    resourceContext,
    typeSpecificEntryInMap(widgetSpecificEntryInMap(reactorConfig, 'infobox'), 'iri'));
}

export function infoBoxPredicate(config, role, predicate, resourceIRI, resourceContext) {
  return resource(resourceIRI, role, config, resourceContext, (config) => {
    const wConfig = widgetSpecificEntryInMap(config, 'infobox');
    const rConfig = roleSpecificEntryInMap(wConfig, role);
    return predicateEntryInMap(rConfig, predicate);
  }, 'predicate');
}

export function predicateEntryInMap(config, predicate, getFunction) {
  if (!getFunction) {
    getFunction = (config) => config;
  }
  if (predicate && config) {
    if (config.property) {
      if (config.property[predicate]) {
        return getFunction(config.property[predicate]);
      } if (config.property._) {
        return getFunction(config.property._);
      }
    }
  }
  return {};
}
