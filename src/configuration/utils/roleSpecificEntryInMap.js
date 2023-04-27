import getSpecificEntry from "./getSpecificEntry";

export default (map, role) => {
    return getSpecificEntry(map, "perspective", role)
}