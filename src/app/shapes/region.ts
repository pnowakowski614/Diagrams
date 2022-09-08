import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portIn, portOut, portsConfig } from "../rappid-configs/portsConfig";
import { defaultGroupShapeAttrs, defaultGroupShapeMarkup } from "../utils/rappid-utils";

export class Region extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.Region,
            localType: LocalShapesTypes.Region,
            size: {
                width: 375,
                height: 375
            },
            attrs: {
                ...defaultGroupShapeAttrs,
                body: {
                    ...defaultGroupShapeAttrs.body,
                    stroke: "gray",
                },
                background: {
                    ...defaultGroupShapeAttrs.background,
                    fill: "gray",
                },
                label: {
                    ...defaultGroupShapeAttrs.label,
                    text: "Region",
                },
                icon: {
                    ...defaultGroupShapeAttrs.icon,
                    href: "icons/other/location.png",
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

    markup = defaultGroupShapeMarkup
}