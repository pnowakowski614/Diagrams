import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portsConfig } from "../rappid-configs/portsConfig";
import { defaultTextWrap, getShapeLabelWidth } from "../utils/rappid-utils";

export class AutoScaling extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.AutoScaling,
            localType: LocalShapesTypes.AutoScaling,
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
                    textWrap: {
                        defaultTextWrap,
                        width: getShapeLabelWidth(GlobalShapesTypes.AutoScaling)
                    },
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
