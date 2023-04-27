import {searchStateId} from "./explorerId";

export default function prepareResultList(resultDict, searchState, newResults, offset, metadata) {
    const id = searchStateId(searchState);
    if (!resultDict) {
        resultDict = {};
    }
    if (!(id in resultDict)) {
        resultDict[id] = {};
    }
    if (metadata) {
        resultDict[id].total = metadata.total;
        resultDict[id].time = metadata.time ? metadata.time.processingTimeInMs : null;
    }
    resultDict[id].list = newResults;
    return resultDict;
}