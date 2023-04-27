import {getAllStep} from "./acquisition";

export function prepareFacetDetails({predicateList, origin}) {
    const steps = [origin ? origin : getAllStep({})];
    if (predicateList) {
        steps.push({
            name: "esm.exploit.facet.property",
            param: {
                properties: [...predicateList.map(p => p.property)]
            }
        });
    }
    return steps;
}