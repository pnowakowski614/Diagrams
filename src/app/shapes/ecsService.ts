import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class ECSService extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.EcsService,
            size: {
                width: 140,
                height: 140,
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "white",
                    stroke: "black"
                },
                label: {
                    text: "ECS Service",
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