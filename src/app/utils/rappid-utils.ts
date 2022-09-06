import * as joint from "@clientio/rappid";
import { dia, shapes, ui } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";

export const defaultShapeAttrs = {
    fontSize: 10,
    textAnchor: "middle",
    refX: "50%",
    refY: "105%"
}

export const defaultStencilLayoutOptions = {
    marginX: -13,
    columns: 1,
    rowHeight: 65
}

export const getMinDimensions = (elementView: dia.ElementView) => {
    switch (elementView.model.prop("type")) {
        case GlobalShapesTypes.NodeShape:
            return 30;
        case GlobalShapesTypes.Region:
            return 375;
        case GlobalShapesTypes.VPC:
            return 325;
        case GlobalShapesTypes.SecurityGroup:
            return 200;
        case GlobalShapesTypes.Subnet:
            return 250;
        case GlobalShapesTypes.EcsService:
        case GlobalShapesTypes.EcsCluster:
            return 100;
        default:
            return 50;
    }
}

export const getResizeDirections = (elementView: dia.ElementView): ui.FreeTransform.Directions[] => {
    if (elementView.model.prop("type") === GlobalShapesTypes.AutoScaling) {
        return ['left', 'right'];
    }
    return ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
}

export const getPreserveAspectRatio = (elementView: dia.ElementView): boolean => {
    return elementView.model.prop("type") !== GlobalShapesTypes.AutoScaling;
}

export const validateEmbedding = (childView: dia.ElementView, parentView: dia.ElementView): boolean => {
    const childsName: LocalShapesTypes = childView.model.prop("localType");
    const parentsName: LocalShapesTypes = parentView.model.prop("localType");

    return validEmbedCombinations.some((combination) =>
        combination.parentsName === parentsName && combination.validChildren.includes(childsName)
    )
}

export const validateConnection = (cellViewS: dia.CellView, magnetS: SVGElement, cellViewT: dia.CellView,
                                   magnetT: SVGElement): boolean => {
    if (cellViewT.model.isLink() || cellViewS.model.isLink()) return false;
    if (cellViewS === cellViewT) return false;
    return magnetT && magnetT.getAttribute('port-group') === 'in';
}

export const getHaloMagnet = (elementView: dia.ElementView, end: 'source' | 'target'): SVGElement => {
    if (end === 'target') return elementView.el.querySelector('[magnet="passive"]') || elementView.el;
    return elementView.el.querySelector('[magnet="true"]') || elementView.el;
}

export const addLinkTools = (linkView: dia.LinkView): void => {
    const linkTools = joint.linkTools;
    const toolsView = new dia.ToolsView({
        name: 'link-pointerdown',
        tools: [
            new linkTools.Vertices(),
            new linkTools.SourceArrowhead(),
            new linkTools.TargetArrowhead(),
            new linkTools.Segments(),
            new linkTools.Boundary({padding: 15, useModelGeometry: true}),
        ]
    });

    linkView.addTools(toolsView);
}

export const getCustomLink = new shapes.standard.Link({
    attrs: {
        line: {
            stroke: 'brown',
            targetMarker: {
                d: 'm 0 -1 v 7 l -7 -7 l 7 -7 z'
            },
        }
    },
    router: {
        name: 'manhattan'
    },
    connector: {
        name: 'jumpover',
    }
})

const validEmbedCombinations: { parentsName: LocalShapesTypes, validChildren: LocalShapesTypes[] }[] = [
    {
        parentsName: LocalShapesTypes.AutoScaling,
        validChildren: [LocalShapesTypes.EC2]
    },
    {
        parentsName: LocalShapesTypes.EcsService,
        validChildren: [LocalShapesTypes.ECSTask]
    },
    {
        parentsName: LocalShapesTypes.EcsCluster,
        validChildren: [LocalShapesTypes.EcsService]
    },
    {
        parentsName: LocalShapesTypes.Region,
        validChildren: [
            LocalShapesTypes.NodeShape,
            LocalShapesTypes.ECSTask,
            LocalShapesTypes.EC2,
            LocalShapesTypes.EcsService,
            LocalShapesTypes.EcsCluster,
            LocalShapesTypes.VPC,
            LocalShapesTypes.Subnet,
            LocalShapesTypes.SecurityGroup,
        ]
    },
    {
        parentsName: LocalShapesTypes.VPC,
        validChildren: [
            LocalShapesTypes.NodeShape,
            LocalShapesTypes.ECSTask,
            LocalShapesTypes.EC2,
            LocalShapesTypes.EcsService,
            LocalShapesTypes.EcsCluster,
            LocalShapesTypes.Subnet,
            LocalShapesTypes.SecurityGroup,
        ]
    },
    {
        parentsName: LocalShapesTypes.Subnet,
        validChildren: [
            LocalShapesTypes.NodeShape,
            LocalShapesTypes.ECSTask,
            LocalShapesTypes.EC2,
            LocalShapesTypes.EcsService,
            LocalShapesTypes.EcsCluster,
            LocalShapesTypes.SecurityGroup,
        ]
    },
    {
        parentsName: LocalShapesTypes.SecurityGroup,
        validChildren: [
            LocalShapesTypes.NodeShape,
            LocalShapesTypes.ECSTask,
            LocalShapesTypes.EC2,
            LocalShapesTypes.EcsService,
            LocalShapesTypes.EcsCluster,
        ]

    }
]