import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { groupShapePortConfig } from "../rappid-configs/portsConfig";
import {
    defaultGroupShapeAttrs,
    defaultGroupShapeMarkup,
    defaultTextWrap,
    getShapeLabelWidth
} from "../utils/rappid-utils";

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
                ...defaultGroupShapeAttrs,
                body: {
                    ...defaultGroupShapeAttrs.body,
                    stroke: "turquoise",
                },
                background: {
                    ...defaultGroupShapeAttrs.background,
                    fill: "turquoise",
                },
                label: {
                    ...defaultGroupShapeAttrs.label,
                    text: "Subnet",
                    textWrap: {
                        defaultTextWrap,
                        width: getShapeLabelWidth(GlobalShapesTypes.Subnet)
                    }
                },
                icon: {
                    ...defaultGroupShapeAttrs.icon,
                    href: "icons/other/lock.png",
                }
            },
            ports: groupShapePortConfig
        }
    }

    markup = defaultGroupShapeMarkup
}
