import { shapes } from "@clientio/rappid";
import { GlobalShapesTypes } from "../types/enums";
import { defaultTextWrap, getShapeLabelWidth } from "../utils/rappid-utils";
import { portsConfig } from "../rappid-configs/portsConfig";

export class NodeShape extends shapes.standard.Rectangle {
  markup = [
    {
      tagName: "rect",
      selector: "body",
    },
    {
      tagName: "text",
      selector: "label",
    },
    {
      tagName: "image",
      selector: "icon",
    },
  ];

  defaults() {
    return {
      ...super.defaults,
      type: GlobalShapesTypes.NodeShape,
      size: {
        width: 45,
        height: 45,
      },
      attrs: {
        body: {
          refWidth: "100%",
          refHeight: "100%",
        },
        label: {
          text: "default",
          textWrap: {
            ...defaultTextWrap,
            width: getShapeLabelWidth(GlobalShapesTypes.NodeShape),
          },
          textAnchor: "right",
          refX: 55,
          refY: 15,
          fontSize: 14,
          fontWeight: "bold",
        },
        icon: {
          refWidth: "100%",
          refHeight: "100%",
          href: "link",
        },
      },
      ports: portsConfig,
    };
  }
}
