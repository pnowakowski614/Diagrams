import * as joint from "@clientio/rappid";
import { dia, ui } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { capitalize, MenuItem } from "@mui/material";
import React from "react";

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

export const getShapeLabelWidth = (elementView: dia.ElementView) => {
    switch (elementView.model.prop("type")) {
        case GlobalShapesTypes.NodeShape:
            return '175%';
        case GlobalShapesTypes.Region:
        case GlobalShapesTypes.VPC:
        case GlobalShapesTypes.SecurityGroup:
        case GlobalShapesTypes.Subnet:
            return '25%';
        case GlobalShapesTypes.EcsService:
        case GlobalShapesTypes.EcsCluster:
            return '50%';
        default:
            return '100%';
    }
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
            new linkTools.Remove(),
            new linkTools.Boundary({padding: 15, useModelGeometry: true}),
        ]
    });

    linkView.addTools(toolsView);
}

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

export const defaultGroupShapeMarkup = [
    {
        tagName: 'rect',
        selector: 'body',
    },
    {
        tagName: 'rect',
        selector: 'background'
    },
    {
        tagName: 'image',
        selector: 'icon'
    },
    {
        tagName: 'text',
        selector: 'label'
    }
]

export const defaultGroupShapeAttrs = {
    body: {
        refWidth: "100%",
        refHeight: "100%",
        fill: "transparent",
        stroke: "blue",
        strokeWidth: "3px"
    },
    background: {
        fill: "blue",
        x: "-25px",
        width: 25,
        refHeight: "70%",
    },
    label: {
        text: "Security",
        fill: "white",
        transform: "translate(-20, 100) rotate(-90)",
        textAnchor: "left",
        refX: 3,
        refY: -30,
        fontSize: 10,
        fontWeight: "bold",
    },
    icon: {
        href: "icons/other/shield.png",
        width: 15,
        height: 15,
        refX: -20,
        refY: 25,
    }
}

export const selectPortsPositions: { [index: string]: string[] } = {
    [LocalShapesTypes.NodeShape]: ["left", "top", "right"],
    [LocalShapesTypes.ECSTask]: ["left", "top", "right"],
    [LocalShapesTypes.EC2]: ["left", "top", "right"],
    [LocalShapesTypes.AutoScaling]: ["left", "bottom", "right"],
    [LocalShapesTypes.Region]: ["left", "top", "right", "bottom"],
    [LocalShapesTypes.VPC]: ["left", "top", "right", "bottom"],
    [LocalShapesTypes.SecurityGroup]: ["left", "top", "right", "bottom"],
    [LocalShapesTypes.Subnet]: ["left", "top", "right", "bottom"],
    [LocalShapesTypes.EcsCluster]: ["left", "top", "right", "bottom"],
    [LocalShapesTypes.EcsService]: ["left", "top", "right", "bottom"]
}

export const portSelectRender = (elementView: dia.ElementView) => {
    const type = elementView.model.prop("localType")
    const portPositions = selectPortsPositions[type];

    return (
        portPositions.map(position => {
            return <MenuItem key={position} value={position}>{capitalize(position)}</MenuItem>
        })
    )
}
