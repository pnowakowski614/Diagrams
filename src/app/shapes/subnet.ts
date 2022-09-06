import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portIn, portOut, portsConfig } from "../rappid-configs/portsConfig";

export class Subnet extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.Subnet,
            localType: LocalShapesTypes.Subnet,
            size: {
                width: 250,
                height: 250
            },
            attrs: {
                body: {
                    refWidth: "100%",
                    refHeight: "100%",
                    fill: "transparent",
                    stroke: "turquoise",
                    strokeWidth: "3px"
                },
                background: {
                    fill: "turquoise",
                    x: "-25px",
                    width: 25,
                    refHeight: "70%",
                },
                label: {
                    text: "Subnet",
                    fill: "white",
                    transform: "translate(-20, 100) rotate(-90)",
                    textAnchor: "right",
                    refX: 3,
                    refY: -30,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                icon: {
                    href: "icons/other/lock.png",
                    width: 15,
                    height: 15,
                    refX: -20,
                    refY: 5,
                }
            },
            ports: {
                ...portsConfig,
                groups: {
                    'in': {
                        ...portIn,
                        position: {
                            name: 'top'
                        }
                    },
                    'out': portOut
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