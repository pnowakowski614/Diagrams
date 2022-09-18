import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class NodeShape extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.NodeShape,
            size: {
                width: 45,
                height: 45
            },
            attrs: {
                root: {
                    dataTooltip: "default",
                    dataTooltipPosition: "left"
                },
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                },
                label: {
                    text: "default",
                    textAnchor: "right",
                    refX: 55,
                    refY: 15,
                    fontSize: 14,
                    fontWeight: "bold"
                },
                icon: {
                    refWidth: "100%",
                    refHeight: "100%",
                    href: "link"
                }
            }
        }
    }

    markup = [{
        tagName: 'rect',
        selector: 'body',
    },
        {
            tagName: 'text',
            selector: 'label'
        },
        {
            tagName: "image",
            selector: "icon",
        }]
}
