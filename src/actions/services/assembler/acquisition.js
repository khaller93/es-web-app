/**
 * assembles a FTS step based on given parameters.
 *
 * @param searchText text for which this step shall search for (required).
 * @param classes a set of classes which its instances shall be considered (optional).
 * if not given, then all instances are considered.
 * @param facet a set of facets that restrict the instance space further (optional).
 * @param searchConfig the fulltext search configuration (optional).
 */
export function getFTSStep({searchText, classes, facet, searchConfig}) {
    if (searchText) {
        const step = {
            name: 'esm.source.fts',
            param: {
                keyword: searchText
            }
        };
        if (classes && classes.length > 0) {
            step.param['classes'] = classes;
        } else if (searchConfig && 'include_classes' in searchConfig && searchConfig['include_classes'].length > 0) {
            step.param['classes'] = searchConfig['include_classes'];
        }
        if (searchConfig && 'exclude_classes' in searchConfig && searchConfig['exclude_classes'].length > 0) {
            if (!step.param['facetFilters']) {
                step.param['facetFilters'] = [];
            }
            step.param['facetFilters'].push({
                type: "excludeInstancesOf",
                classes: searchConfig['exclude_classes'],
            });
        }
        return step;
    }
    return null;
}

/**
 * assembles an all source step based on given parameters.
 *
 * @param includedClasses a set of classes for which its instances shall be considered (optional).
 * @param excludedClasses a set of classes for which its instances shall be excluded (optional).
 * @param facet a set of facets that restrict the instance space further (optional).
 * @return {{}} all source step based on given parameters.
 */
export function getAllStep({includedClasses, excludedClasses, facet}) {
    const step = {
        name: 'esm.source.all',
        param: {}
    };
    if (includedClasses && includedClasses.length > 0) {
        step.param.include = includedClasses;
    }
    if (excludedClasses && excludedClasses.length > 0) {
        if (!step.param['facetFilters']) {
            step.param['facetFilters'] = [];
        }
        step.param['facetFilters'].push({
            type: "excludeInstancesOf",
            classes: excludedClasses,
        });
    }
    return step;
}

export function getSingleStep({iri}) {
    return {
        name: 'esm.source.single',
        param: {
            resource: iri
        }
    };
}