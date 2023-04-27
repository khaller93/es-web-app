function hash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        let character = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function searchStateId({searchText, categories, selectedResource, facets}) {
    return hash('t' + searchText + '_c' + (categories && categories.length > 0 ? categories.join(',') : 'undef') + '_f' + (facets ? facets : 'undef') + '_s' + (selectedResource ? selectedResource : 'undef'));
}


export function sparqlStateId({text, type}) {
    return hash('q' + text + '_t' + type);
}

export function treeViewStateId({role, view}) {
    return hash('v' + view + '_r' + role);
}