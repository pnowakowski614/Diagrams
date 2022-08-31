import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portsConfig } from "../rappid-configs/portsConfig";

export class VPC extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.VPC,
            localType: LocalShapesTypes.VPC,
            size: {
                width: 275,
                height: 250,
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "transparent",
                    stroke: "green",
                    strokeWidth: "3px"
                },
                background: {
                    fill: "green",
                    x: "-25px",
                    width: 25,
                    refHeight: "70%",
                },
                label: {
                    text: "VPC",
                    fill: "white",
                    transform: "translate(-20, 100) rotate(-90)",
                    textAnchor: "right",
                    refX: 3,
                    refY: -30,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                icon: {
                    href: "icons/other/cloud.png",
                    width: 20,
                    height: 20,
                    refX: -20,
                    refY: 5,
                }
            },
            ports: portsConfig
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
                    tagName: 'text',
                    selector: 'label'
                },
                {
                    tagName: 'image',
                    selector: 'icon'
                }]
    }]
}