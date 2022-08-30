import { dia, ui } from "@clientio/rappid";
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
    console.log(elementView.model.prop("type"));
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