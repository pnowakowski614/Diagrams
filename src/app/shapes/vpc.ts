import { shapes } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { groupShapePortConfig } from "../rappid-configs/portsConfig";
import {
  defaultGroupShapeAttrs,
  defaultGroupShapeMarkup,
  defaultTextWrap,
  getShapeLabelWidth,
} from "../utils/rappid-utils";

export class VPC extends shapes.standard.Rectangle {
  markup = defaultGroupShapeMarkup;

  defaults() {
    return {
      ...super.defaults,
      type: GlobalShapesTypes.VPC,
      localType: LocalShapesTypes.VPC,
      size: {
        width: 325,
        height: 325,
      },
      attrs: {
        ...defaultGroupShapeAttrs,
        body: {
          ...defaultGroupShapeAttrs.body,
          stroke: "green",
        },
        background: {
          ...defaultGroupShapeAttrs.background,
          fill: "green",
        },
        label: {
          ...defaultGroupShapeAttrs.label,
          text: "VPC",
          textWrap: {
            ...defaultTextWrap,
            width: getShapeLabelWidth(GlobalShapesTypes.VPC),
          },
        },
        icon: {
          ...defaultGroupShapeAttrs.icon,
          href: "icons/other/cloud.png",
        },
      },
      ports: groupShapePortConfig,
    };
  }
}
