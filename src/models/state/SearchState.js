import ESState from './ESState';

const eqArray = (a1, a2) => {
  if (a1 === a2) {
    return true;
  }
  if (a1 && a2 && a1.length === a2.length) {
    for (let i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

/**
 * This is an ESState for the search interaction page. it
 * maintains the entered search phrase, selected categories
 * (their classes respectively) and the facet selections.
 */
class SearchState extends ESState {
  constructor(role, {
    searchText, categories, selectedResource, facets,
  }) {
    super('search', role);
    this.searchText = searchText || null;
    this.categories = categories || null;
    this.selectedResource = selectedResource || null;
    this.facets = facets || null;
  }

  /**
   * assembles the search state from the given information.
   *
   * @param role role for which it shall be assembled.
   * @param q query parameter for the search text.
   * @param c references the categories that shall be considered.
   * @param s references the IRI that shall show up on the top.
   * @param f references the selected facets and corresponding values.
   * @return {SearchState} search state assembled from the given information.
   */
  static assembleFromQueryParams(role, {
    q, c, s, f,
  }) {
    let categories = null;
    if (c) {
      categories = c.split(',');
    }
    let facets = null;
    if (f) {
      facets = JSON.parse(atob(f));
    }
    return new SearchState(role,
      {
        searchText: q, categories, facets, selectedResource: s,
      });
  }

  /**
   * checks whether the given other state matches this state (i.e. key information are the same).
   *
   * @param otherState which shall be checked.
   * @return {*|boolean} true, if the given other state matches this one, otherwise, false.
   */
  match(otherState) {
    return super.match(otherState) && (this.searchText === otherState.searchText)
      && eqArray(this.categories, otherState.categories)
      && (this.selectedResource === otherState.selectedResource)
      && (this.facets === otherState.facets);
  }

  /**
   * gets a plain old Javascript object holding the key information.
   *
   * @return {{}} a plain old Javascript object holding the key information.
   */
  get plainObject() {
    return Object.assign(super.plainObject, {
      searchText: this.searchText,
      categories: this.categories,
      selectedResource: this.selectedResource,
      facets: this.facets,
    });
  }

  /**
   * gets a compact string for the key information.
   *
   * @return {string} a compact string for the key information.
   */
  get string() {
    return `${super.string}<s:${this.searchText}/><c:${
      this.categories && this.categories.length > 0 ? this.categories.join(',') : 'undef'
    }/><f:${this.facets ? btoa(JSON.stringify(this.facets)) : 'undef'}/><s:${
      this.selectedResource ? this.selectedResource : 'undef'}/>`;
  }

  /**
   *
   *
   * @param queryParams
   * @return {{}}
   */
  navigationObject(queryParams) {
    const queries = queryParams ? { ...queryParams } : {};
    if (this.searchText) {
      queries.q = this.searchText;
    }
    if (this.categories) {
      queries.c = this.categories.join(',');
    }
    if (this.selectedResource) {
      queries.s = this.selectedResource;
    }
    if (this.facets) {
      queries.f = btoa(JSON.stringify(this.facets));
    }
    return {
      routeName: 'Explorer',
      params: {
        method: 'search',
      },
      query: queries,
    };
  }

  static of({
    role, searchText, categories, selectedResource, facets,
  }) {
    return new SearchState(role, {
      searchText, categories, selectedResource, facets,
    });
  }
}

export default SearchState;
