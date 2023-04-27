import Server from "../server";

/**
 *
 */
class ESM extends Server {

    constructor(serverUrl) {
        super();
        this.serverUrl = serverUrl[serverUrl.length - 1] !== `/` ? serverUrl + '/' : serverUrl;
    }

    get explorationFlowEndPoint() {
        return this.serverUrl + "explore/with/custom/flow/";
    }

    get sparqlQueryEndpoint() {
        return this.serverUrl + "sparql";
    }
}

export default ESM;