import { shapes } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { portsConfig } from "../rappid-configs/portsConfig";
import { defaultTextWrap, getShapeLabelWidth } from "../utils/rappid-utils";

export class ECSService extends shapes.standard.Rectangle {
  markup = [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "text",
      selector: "label",
    },
  ];

  defaults() {
    return {
      ...super.defaults,
      type: GlobalShapesTypes.EcsService,
      localType: LocalShapesTypes.EcsService,
      size: {
        width: 140,
        height: 140,
      },
      attrs: {
        body: {
          refWidth: "100%",
          refHeight: "100%",
          fill: "white",
          stroke: "black",
        },
        label: {
          text: "ECS Service",
          textWrap: {
            ...defaultTextWrap,
            width: getShapeLabelWidth(GlobalShapesTypes.EcsService),
          },
          textAnchor: "right",
          refX: 5,
          refY: 5,
          fontSize: 10,
          fontWeight: "bold",
        },
      },
      ports: portsConfig,
    };
  }
}
