import {applyMiddleware, createStore} from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "../reducers";
import historyReducer from "../reducers/historyReducer";
import appReducer from "../reducers/appReducer";
import {persistState} from "./localstorage";

const store = createStore(reducers, applyMiddleware(promise, thunk, logger));

const historyId = historyReducer.id;
const appId = appReducer.id;

store.subscribe(() => {
    const state = store.getState();
    persistState(historyId, state[historyId]);
    persistState(appId, {
        role: state[appId].role,
        language: state[appId].language,
    });
});

export default store;