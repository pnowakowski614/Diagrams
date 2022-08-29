import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes } from "../types/enums";

export class SecurityGroup extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.SecurityGroup,
            size: {
                width: 275,
                height: 250
            },
            attrs: {
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
                    textAnchor: "right",
                    refX: 3,
                    refY: -30,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                icon: {
                    href: "icons/other/shield.png",
                    width: 15,
                    height: 15,
                    refX: -20,
                    refY: 5,
                }
            }
        }
    }

    markup = [{
        tagName: 'g',
        children:
            [{
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
                }]
    }]
}