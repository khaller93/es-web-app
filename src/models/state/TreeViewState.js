import ESState from "./ESState";

/**
 *
 */
class TreeViewState extends ESState {

    constructor(role, {view, selectedIRI}) {
        super('treeview', role);
        this.view = view;
        this.iri = selectedIRI;
    }

    /**
     * assembles the tree view state from the given information.
     *
     * @param role role for which it shall be assembled.
     * @param v name of the view that shall be selected.
     * @param s references the IRI that shall be selected in the tree view.
     * @return {TreeViewState} tree view state state assembled from the given information.
     */
    static assembleFromQueryParams(role, {v, s}) {
        return new TreeViewState(role, {view: v, selectedIRI: s});
    }

    /**
     * checks whether the given other state matches this state (i.e. key information are the same).
     *
     * @param otherState which shall be checked.
     * @return {*|boolean} true, if the given other state matches this one, otherwise, false.
     */
    match(otherState) {
        return super.match(otherState) && (this.view === otherState.view);
    }

    /**
     * gets a compact string for the key information.
     *
     * @return {string} a compact string for the key information.
     */
    get string() {
        return super.string + '<view:' + this.view + '/>';
    }

    /**
     * gets a plain old Javascript object holding the key information.
     *
     * @return {{}} a plain old Javascript object holding the key information.
     */
    get plainObject() {
        return Object.assign(super.plainObject, {
            selectedIRI: this.iri,
            view: this.view,
        });
    }

    navigationObject(queryParams) {
        const params = {};
        if (this.view) {
            params.v = this.view;
        }
        if (this.iri) {
            params.s = this.iri;
        }
        return {
            routeName: 'Explorer',
            params: {
                method: 'treeview'
            },
            query: Object.assign(params, queryParams),
        };
    }

    static of({role, view, selectedIRI}) {
        return new TreeViewState(role, {view, selectedIRI});
    }

}

export default TreeViewState;