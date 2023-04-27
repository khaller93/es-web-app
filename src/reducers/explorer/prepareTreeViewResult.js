import {treeViewStateId} from "./explorerId";

export default function prepareTreeViewResult(resultDict, treeViewIdObj, newResult) {
    const id = treeViewStateId(treeViewIdObj);
    if (!resultDict) {
        resultDict = {};
    }
    if (!(id in resultDict)) {
        resultDict[id] = {};
    }
    resultDict[id] = newResult;
    return resultDict;
}