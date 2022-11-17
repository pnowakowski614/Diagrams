import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portsConfig } from "../rappid-configs/portsConfig";
import { defaultTextWrap, getShapeLabelWidth } from "../utils/rappid-utils";

export class ECSCluster extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.EcsCluster,
            localType: LocalShapesTypes.EcsCluster,
            size: {
                width: 200,
                height: 200
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "#9c9e9a",
                    stroke: "black"
                },
                label: {
                    text: "ECS Cluster",
                    textWrap: {
                        defaultTextWrap,
                        width: getShapeLabelWidth(GlobalShapesTypes.EcsCluster)
                    },
                    textAnchor: "right",
                    refX: 5,
                    refY: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
            },
            ports: portsConfig
        }
    }

    markup = [
        {
            tagName: 'rect',
            selector: 'body',
        },
        {
            tagName: 'text',
            selector: 'label'
        }]
}
