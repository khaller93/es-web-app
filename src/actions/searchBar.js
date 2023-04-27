/**
 * updates the text in the search bar to the given search text.
 *
 * @param searchText the text in the search bar shall be changed to.
 * @return {{payload: *, type: string}} action payload for
 * updating the search text of a search bar.
 */
export function updateSearchText(searchText) {
    return {
        type: 'UPDATE_SEARCH_BAR_TEXT',
        payload: searchText
    }
}

/**
 * updates the categories that shall be selected in the search bar.
 *
 * @param categories which shall be selected.
 * @return {{payload: *, type: string}} action payload for
 * updating the selected categories in a search bar.
 */
export function updateCategories(categories) {
    return {
        type: 'UPDATE_SEARCH_BAR_CATEGORIES',
        payload: categories
    }
}