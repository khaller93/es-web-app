import {prepareDescriptionStep} from "./description";
import {getAllStep, getFTSStep, getSingleStep} from "./acquisition";
import {getLimitStep, getOffsetStep} from "./aggregation";

/**
 * prepares the ranking for a fulltext search result based
 * on the given configuration.
 *
 * @param ranking configuration for the ranking.
 * @return {Array} exploration flow steps for ranking fulltext search
 * results.
 */
export function prepareRankingSteps(ranking) {
    const rankingSteps = [];
    const weightedSumStep = {
        name: 'esm.aggregate.weightedsum',
        param: {
            path: '/esw_score',
            candidates: {'/fts/score': 1.0}
        }
    };
    if (ranking) {
        const rankingKeys = Object.keys(ranking);
        for (let i = 0; i < rankingKeys.length; i++) {
            const r = rankingKeys[i];
            if (r !== 'fts') {
                const stepKey = ranking[r].step;
                rankingSteps.push({
                    name: stepKey
                });
                weightedSumStep.param.candidates['/centrality/' + stepKey + "/minmax"] = ranking[r].weight;
            } else {
                weightedSumStep.param.candidates['/fts/score'] = ranking[r].weight;
            }
        }
    }
    rankingSteps.push(weightedSumStep);
    rankingSteps.push({
        name: 'esm.aggregate.orderby',
        param: {
            path: '/esw_score',
            strategy: 'DESC'
        }
    });
    return rankingSteps;
}

/**
 *
 *
 * @param searchText
 * @param classes
 * @param facet
 * @param limit
 * @param offset
 * @param searchConfig
 * @param appConfig
 * @return {*[]}
 */
export function prepareExplorationFlow({searchText, classes, selectedResource, facet, limit, offset}, searchConfig, appConfig) {
    const sourceStep = searchText ? getFTSStep({searchText, classes, facet, searchConfig}) : getAllStep({
        classes,
        facet
    });
    /* add further steps */
    const steps = [sourceStep, {name: 'esm.aggregate.distinct'}];
    if (searchConfig && searchConfig.ranking) {
        steps.push(...prepareRankingSteps(searchConfig.ranking));
    }
    if (selectedResource) {
        steps.push({
            name: 'esm.source.resourcelist.add',
            param: {
                resources: [selectedResource],
                index: 0,
                nodup: true,
            }
        });
    }
    steps.push({
        name: 'esm.exploit.result.collection.count', param: {
            name: 'total'
        }
    });
    if (offset) {
        steps.push(getOffsetStep(offset));
    }
    if (limit) {
        steps.push(getLimitStep(limit));
    }
    steps.push(prepareDescriptionStep(searchConfig ? searchConfig.snippet : null,
        appConfig ? appConfig['supported_languages'] : null));
    steps.push({name: 'esm.exploit.class.info'});
    return steps;
}


export function prepareSimRankingSteps(ranking) {
    const rankingSteps = [];
    const weightedSumStep = {
        name: 'esm.aggregate.weightedsum',
        param: {
            path: '/esSimRank',
            candidates: {}
        }
    };
    if (ranking) {
        const rankingKeys = Object.keys(ranking);
        for (let i = 0; i < rankingKeys.length; i++) {
            const r = rankingKeys[i];
            const stepKey = ranking[r].step;
            rankingSteps.push({
                name: stepKey
            });
            weightedSumStep.param.candidates['/similarity/' + stepKey + "/minmax"] = ranking[r].weight;
        }
    }
    rankingSteps.push(weightedSumStep);
    rankingSteps.push({
        name: 'esm.aggregate.orderby',
        param: {
            path: '/esSimRank',
            strategy: 'DESC'
        }
    });
    return rankingSteps;
}

export function prepareSimilarityFlow({iri, config: {ranking, classes = null, excludedClasses = null, number = 5}}) {
    const steps = [getSingleStep({iri}),
        {
            name: 'esm.source.pairing',
            param: {
                selfReflectionAllowed: false,
                steps: [
                    getAllStep({includedClasses: classes, excludedClasses: excludedClasses}),
                ]
            }
        }];
    steps.push(...prepareSimRankingSteps(ranking));
    if (number && number > 0) {
        steps.push(getLimitStep(number));
    }
    return steps;
}

export function prepareNeighbourhoodFlow({iri, config}) {
    const steps = [getSingleStep({iri})];
    // prepare neighbourhood
    const neighbourhoodStep = {
        name: 'esm.source.neighbourhood',
        param: {}
    };
    if (config && config.includedProperties) {
        neighbourhoodStep.param['includedProperties'] = config.includedProperties;
    }
    if (config && config.excludedProperties) {
        neighbourhoodStep.param['excludedProperties'] = config.excludedProperties;
    }
    steps.push(neighbourhoodStep);
    // include provenance ?
    if (config.provenance) {
        steps.push({name: 'esm.exploit.neighbourhood.provenance'});
    }
    return steps;
}

export function prepareTreeViewFlow({treeview, description, supportLanguages}) {
    const treeViewStep = {name: 'esm.source.hierarchy.checking', param: {}};
    if (treeview && treeview.include_classes) {
        treeViewStep.param['includeClasses'] = treeview.include_classes;
    }
    if (treeview && treeview.exclude_classes) {
        treeViewStep.param['excludeClasses'] = treeview.exclude_classes;
    }
    if (treeview && treeview.bottom_up_properties) {
        treeViewStep.param['bottomUpProperties'] = treeview.bottom_up_properties;
    }
    if (treeview && treeview.top_down_properties) {
        treeViewStep.param['topDownProperties'] = treeview.top_down_properties;
    }
    return [treeViewStep, {name: 'esm.exploit.class.info'}, prepareDescriptionStep(description, supportLanguages)];
}