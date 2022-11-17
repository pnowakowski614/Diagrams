import { shapes } from '@clientio/rappid';
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { groupShapePortConfig } from "../rappid-configs/portsConfig";
import {
    defaultGroupShapeAttrs,
    defaultGroupShapeMarkup,
    defaultTextWrap,
    getShapeLabelWidth
} from "../utils/rappid-utils";

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
            attrs: {
                ...defaultGroupShapeAttrs,
                label: {
                    textWrap: {
                        defaultTextWrap,
                        width: getShapeLabelWidth(GlobalShapesTypes.SecurityGroup)
                    }
                }
            },
            ports: groupShapePortConfig
        }
    }

    markup = defaultGroupShapeMarkup
}
