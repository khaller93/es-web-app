import getSpecificEntry from "./getSpecificEntry";

export default (map, type) => {
    return getSpecificEntry(map, "type", type);
}