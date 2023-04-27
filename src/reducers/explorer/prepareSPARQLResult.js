import {sparqlStateId} from "./explorerId";

export default function prepareSPARQLResult(resultDict, sparqlIdObj, newResult) {
    const id = sparqlStateId(sparqlIdObj);
    if (!resultDict) {
        resultDict = {};
    }
    if (!(id in resultDict)) {
        resultDict[id] = {};
    }
    resultDict[id] = newResult;
    return resultDict;
}