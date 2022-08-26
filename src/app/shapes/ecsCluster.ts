import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class ECSCluster extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.EcsCluster,
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
                    textAnchor: "right",
                    refX: 5,
                    refY: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
            }
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

Object.assign(shapes, {
    app: {
        ...(shapes as any).app,
        ECSCluster
    }
});