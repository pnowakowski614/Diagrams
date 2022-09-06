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
        case GlobalShapesTypes.VPC:
        case GlobalShapesTypes.SecurityGroup:
        case GlobalShapesTypes.Subnet:
            return 150;
        case GlobalShapesTypes.EcsService:
        case GlobalShapesTypes.EcsCluster:
            return 100;
        default:
            return 50;
    }
}

export const getResizeDirections = (elementView: dia.ElementView): ui.FreeTransform.Directions[] | undefined => {
    let directions: ui.FreeTransform.Directions[];
    if (elementView.model.prop("type") === GlobalShapesTypes.AutoScaling) {
        directions = ['left', 'right'];
        return directions;
    }
}

export const getPreserveAspectRatio = (elementView: dia.ElementView): boolean => {
    return elementView.model.prop("type") !== GlobalShapesTypes.AutoScaling;
}

export const validateEmbedding = (childView: dia.ElementView, parentView: dia.ElementView): boolean => {
    let childsName = childView.model.prop("localType");
    let parentsName = parentView.model.prop("localType");

    switch (true) {
        case (childsName === LocalShapesTypes.EcsService && parentsName === LocalShapesTypes.EcsCluster):
        case (childsName === LocalShapesTypes.EC2 && parentsName === LocalShapesTypes.AutoScaling):
        case (childsName === LocalShapesTypes.ECSTask && parentsName === LocalShapesTypes.EcsService):
            return true;
        default:
            return false;
    }
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

export const addLinkTools = (linkView: dia.LinkView) => {
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