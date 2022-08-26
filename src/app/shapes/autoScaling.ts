import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class AutoScaling extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.AutoScaling,
            size: {
                width: 70,
                height: 50,
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    height: 50,
                    fill: "orange",
                },
                label: {
                    text: "Auto Scaling",
                    textAnchor: "middle",
                    refX: "50%",
                    refY: -20,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                leftArrow: {
                    d: "m 0 25 v 35 l -35 -35 l 35 -35 z",
                    fill: "orange",
                    refX: "0%"
                },
                rightArrow: {
                    d: "m 0 25 v -35 l 35 35 l -35 35 z",
                    fill: "orange",
                    refX: "100%"
                }
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
        },
        {
            tagName: 'path',
            selector: 'leftArrow'
        },
        {
            tagName: 'path',
            selector: 'rightArrow'
        }
    ]
}

Object.assign(shapes, {
    app: {
        ...(shapes as any).app,
        AutoScaling
    }
});