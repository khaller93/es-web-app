export function enableFacetPredicate(predicate, enable) {
    return {
        type: "ENABLE_FACET_PREDICATE",
        payload: {predicate, enable}
    };
}

export function changeFacetSelection(esSate, role, predicate, selectionFunction) {
    return {
        type: "CHANGE_FACET_SELECTION",
        payload: {
            id: esSate && esSate.id ? esSate.id : 'all',
            role: role,
            predicate: predicate,
            selectionFunction: selectionFunction,
        }
    }
}

export function deleteFacetSelection(esSate, role, predicate) {
    return {
        type: "DELETE_FACET_SELECTION",
        payload: {
            id: esSate && esSate.id ? esSate.id : 'all',
            role: role,
            predicate: predicate,
        }
    }
}