export default (statusObj, stateId, status) => {
    if (!statusObj) {
        statusObj = {};
    }
    statusObj[stateId] = status;
    return statusObj;
};