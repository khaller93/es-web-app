/**
 *
 */
class Server {

    /**
     *
     * @param searchPhrase
     * @param includedClasses
     * @param excludedClasses
     * @param facets
     * @param limit
     * @param offset
     * @return promise for getting the search result.
     */
    search(searchPhrase, {includedClasses, excludedClasses, facets}, {limit, offset}) {
        throw new Error('The search method must have been implemented.');
    }


}

export default Server;