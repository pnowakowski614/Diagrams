import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { groupShapePortConfig } from "../rappid-configs/portsConfig";
import { defaultGroupShapeAttrs, defaultGroupShapeMarkup } from "../utils/rappid-utils";

export class SecurityGroup extends shapes.standard.Rectangle {
    defaults() {
        return {
            ...super.defaults,
            type: GlobalShapesTypes.SecurityGroup,
            localType: LocalShapesTypes.SecurityGroup,
            size: {
                width: 200,
                height: 200
            },
            attrs: defaultGroupShapeAttrs,
            ports: groupShapePortConfig
        }
    }

    markup = defaultGroupShapeMarkup
}