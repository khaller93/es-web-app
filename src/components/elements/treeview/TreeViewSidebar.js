import React from 'react';
import {fade, makeStyles, withStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import intLabelInMap from "../../../configuration/intLabelInMap";
import ResourceReactorComponent from "../../reactor/object/ResourceReactorComponent";
import {resourceForTreeView} from "../../../configuration/reactorConfiguration";
import MinusSquare from "./icon/MinusSquare";
import PlusSquare from "./icon/PlusSquare";
import CloseSquare from "./icon/CloseSquare";
import TransitionComponent from "./TransitionComponent";

/* style for the side bar */
const useStyles = makeStyles(theme => ({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: '100%',
    },
    normalEntry: {},
    selectedEntry: {
        backgroundColor: 'lightgrey',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    }
}));

/* item shown in the tree view */
const StyledTreeItem = withStyles(theme => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 12,
        paddingLeft: 12,
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent}/>);

/**
 * gets the parents in the corresponding tree.
 *
 * @param currentResource the currently viewed resource.
 * @param resultMap in which the resource is located.
 * @returns {[]}
 */
const getParentsInTree = (currentResource, resultMap) => {
    let parents = [];
    const rn = resultMap[currentResource];
    if (rn && rn.parents) {
        for (let i = 0; i < rn.parents.length; i++) {
            parents.push(...getParentsInTree(rn.parents[i], resultMap));
        }
        parents.push(rn.resource);
    }
    return parents;
};

/**
 *
 * @param role which is currently active.
 * @param view
 * @param treeViewConfig
 * @param reactorConfig
 * @param result
 * @param selectedIRI
 * @param onResourceSelected
 * @param intl internationalization object.
 */
const TreeViewSidebar = ({role, view, treeViewConfig, reactorConfig, result, selectedIRI, onResourceSelected, intl}) => {
    const classes = useStyles();

    /**
     * handle the click of a resource in the side bar.
     *
     * @param nodeID
     * @param expanded
     */
    const handleNode = (event, nodeID) => {
        console.log("TVS: Click:", nodeID, event)
        if (nodeID && nodeID.length > 0 && nodeID[0] !== 'root' && onResourceSelected) {
            onResourceSelected(nodeID[0]);
        }
    };

    /**
     *
     * @param resultMap
     * @param root
     * @param rootIndex
     * @returns {any}
     */
    const generateTree = (resultMap, root, rootIndex) => {
        return root && root.length > 0 ? root.sort((a, b) => a - b).map((rn, index) => (
            <StyledTreeItem nodeId={rn.resource} label={
                <React.Fragment>
                    <ResourceReactorComponent mode={view} iri={rn.resource} role={role} intl={intl}
                                              reactorConfig={reactorConfig}
                                              getReactorConfigEntry={config => resourceForTreeView(config, rn.resource, role, {classes: ['http://www.w3.org/2000/01/rdf-schema#Class']})}
                                              componentProps={{className: rn.resource === selectedIRI ? classes.selectedEntry : classes.normalEntry}}/>
                </React.Fragment>
            } key={rootIndex + '-' + index}>
                {generateTree(resultMap, rn.children ? rn.children.map(c => resultMap[c]) : null, rootIndex + '-' + index)}
            </StyledTreeItem>
        )) : null;
    };

    if (result && result.all && result.all.length > 0 && result.root && result.root.length > 0) {
        const resultMap = {};
        for (let i = 0; i < result.all.length; i++) {
            resultMap[result.all[i].resource] = result.all[i];
        }
        return (
            <TreeView
                onNodeToggle={handleNode}
                className={classes.root}
                defaultExpanded={['root', ...getParentsInTree(selectedIRI, resultMap)]}
                defaultCollapseIcon={<MinusSquare/>}
                defaultExpandIcon={<PlusSquare/>}
                defaultEndIcon={<CloseSquare/>}
            >
                <StyledTreeItem nodeId="root"
                                label={treeViewConfig && treeViewConfig.name ? intLabelInMap(treeViewConfig.name, intl) : '*'}>
                    {generateTree(resultMap, result.root, 'level-', role, view, treeViewConfig, intl)}
                </StyledTreeItem>
            </TreeView>
        );
    }
    return null;
};

export default TreeViewSidebar;