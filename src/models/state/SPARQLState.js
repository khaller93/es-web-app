import ESState from "./ESState";

/**
 *
 */
class SPARQLState extends ESState {

    constructor(role, text, type) {
        super('sparql', role);
        this.text = text;
        this.type = type;
    }

    /**
     * assembles the sparql state from the given information.
     *
     * @param role role for which it shall be assembled.
     * @param q the given query text.
     * @param t the given type.
     * @return {SPARQLState} sparql state assembled from the given information.
     */
    static assembleFromQueryParams(role, {q, t}) {
        if (q) {
            return new SPARQLState(role, q, t);
        }
        return null;
    }

    /**
     * checks whether the given other state matches this state (i.e. key information are the same).
     *
     * @param otherState which shall be checked.
     * @return {*|boolean} true, if the given other state matches this one, otherwise, false.
     */
    match(otherState) {
        return otherState && (this.text === otherState.text);
    }

    /**
     * gets a plain old Javascript object holding the key information.
     *
     * @return {{}} a plain old Javascript object holding the key information.
     */
    get plainObject() {
        return Object.assign(super.plainObject, {
            text: this.text,
            type: this.type,
        });
    }

    /**
     * gets a compact string for the key information.
     *
     * @return {string} a compact string for the key information.
     */
    get string() {
        return super.string + '<query:' + this.text + '/>';
    }

    navigationObject(queryParams) {
        const params = {};
        if (this.text) {
            params.q = this.text;
        }
        if (this.type) {
            params.t = this.type;
        }
        return {
            routeName: 'Explorer',
            params: {
                method: 'sparql'
            },
            query: Object.assign(params, queryParams),
        };
    }

    static of({role, text, type}) {
        return new SPARQLState(role, text, type);
    }

}

export default SPARQLState;