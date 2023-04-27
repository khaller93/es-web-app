export function getResourceDescription(resources, valueMap) {
    const descList = [];
    if (resources && valueMap) {
        for (let i = 0; i < resources.length; i++) {
            const vEntry = valueMap[resources[i]];
            if (vEntry && vEntry.describe) {
                descList.push({
                    iri: resources[i],
                    description: extractDescription(vEntry.describe),
                });
            }
        }
    }
    return descList;
}

export function extractDescription(values) {
    if (values) {
        const description = {};
        if (values.label && values.label.values) {
            description.label = values.label.values;
            if ('default' in description.label) {
                description.label['_'] = description.label['default'];
                delete description.label['default'];
            }
        }
        if (values.description && values.description.values) {
            description.description = values.description.values;
            if ('default' in description.description) {
                description.description['_'] = description.description['default'];
                delete description.description['default'];
            }
        }
        if (values.depiction && values.depiction.values) {
            description.depiction = values.depiction.values;
        }
        return description;
    }
    return null;
}

export function getClassInformation(resources, valueMap) {
    const ciList = [];
    if (resources && valueMap) {
        for (let i = 0; i < resources.length; i++) {
            const vEntry = valueMap[resources[i]];
            if (vEntry && vEntry.classInfo) {
                ciList.push({
                    iri: resources[i],
                    classInfo: vEntry.classInfo,
                });
            }
        }
    }
    return ciList;
}

export function getSimilarityEntries(values) {
    if (values && values.pairs) {
        return [...values.pairs.map(p => p.second)];
    }
    return [];
}

export function extractProvenance(id, valueMap) {
    if (valueMap && valueMap[id] && valueMap[id].provenance) {
        const namespaces = valueMap[id].provenance.namespaces;
        if (namespaces) {
            return namespaces.map(n => {
                return {
                    type: 'iri',
                    value: n,
                };
            });
        }
    }
    return [];
}

export function extractNeighbourhoodFromResource(iri, neighbourhood, valueMap) {
    if (iri && neighbourhood && neighbourhood[iri]) {
        const neighObj = neighbourhood[iri];
        if (neighObj.properties) {
            const response = {};
            const props = Object.keys(neighObj.properties);
            for (let n = 0; n < props.length; n++) {
                const terms = neighObj.properties[props[n]];
                response[props[n]] = terms ? terms.map(t => {
                    if (typeof t === 'string') {
                        return {type: 'iri', value: t, namespaces: extractProvenance(t, valueMap)};
                    } else {
                        return {
                            type: 'literal',
                            value: t.literal,
                            'xml:lang': t.language,
                            datatype: t.datatype,
                            namespaces: extractProvenance(t.id, valueMap),
                        };
                    }
                }) : null;
            }
            return {props: response};
        }
    }
    return {props: null};
}

export function getFacetDetailValues(predicateList, data) {
    const pMap = {};
    for (let i = 0; i < predicateList.length; i++) {
        const cp = predicateList[i];
        pMap[cp.property] = cp.id;
    }
    const values = {};
    if (data && data.metadata && data.metadata.facet) {
        const facetPredicates = Object.keys(data.metadata.facet);
        for (let n = 0; n < facetPredicates.length; n++) {
            if (pMap[facetPredicates[n]]) {
                values[pMap[facetPredicates[n]]] = data.metadata.facet[facetPredicates[n]].map(obj => {
                    let transformedTerm = null;
                    if (obj.type === 'literal') {
                        const term = obj.literal;
                        transformedTerm = {
                            type: 'literal',
                            value: term.literal,
                            'xml:lang': term.language,
                            datatype: term.datatype,
                        }
                    } else if (obj.type === 'iri') {
                        transformedTerm = {
                            type: 'iri',
                            value: obj.iri
                        }
                    }
                    return {total: obj.total, term: transformedTerm};
                });
            }
        }
    }
    return values;
}