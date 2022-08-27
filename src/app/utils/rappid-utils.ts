import { dia, ui } from "@clientio/rappid";
import { GlobalShapesTypes } from "../types/enums";

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
    switch (elementView.model.attributes.type) {
        case GlobalShapesTypes.Node:
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

export const getResizeDirections = (elementView: dia.ElementView) => {
    let directions: ui.FreeTransform.Directions[];
    if (elementView.model.attributes.type === GlobalShapesTypes.AutoScaling) {
        directions = ['left', 'right'];
        return directions;
    }
}

export const getPreserveAspectRatio = (elementView: dia.ElementView): boolean => {
    return elementView.model.attributes.type !== GlobalShapesTypes.AutoScaling;
}

export const validateEmbedding = (childView: dia.ElementView, parentView: dia.ElementView): boolean => {
    let childsName = childView.model.attributes.attrs?.label?.text;
    let parentsName = parentView.model.attributes.attrs?.label?.text;

    switch (true) {
        case (childsName === "ECS Service" && parentsName === "ECS Cluster"):
        case (childsName === "Amazon EC2" && parentsName === "Auto Scaling"):
        case (childsName === "ECS Task" && parentsName === "ECS Service"):
            return true;
        default:
            return false;
    }
}