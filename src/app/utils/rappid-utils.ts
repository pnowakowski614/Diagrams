import * as joint from "@clientio/rappid";
import { dia, layout, ui } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { groupList, validEmebedCombinationConsts } from "./config-utils";

export const getShapeLabelWidth = (cellType: GlobalShapesTypes) => {
  switch (cellType) {
    case GlobalShapesTypes.NodeShape:
      return "175%";
    case GlobalShapesTypes.Region:
    case GlobalShapesTypes.VPC:
    case GlobalShapesTypes.SecurityGroup:
    case GlobalShapesTypes.Subnet:
      return "30%";
    case GlobalShapesTypes.EcsService:
    case GlobalShapesTypes.EcsCluster:
      return "50%";
    default:
      return "100%";
  }
};

export const getMinDimensions = (element: dia.Element) => {
  switch (element.prop("type")) {
    case GlobalShapesTypes.NodeShape:
      return 30;
    case GlobalShapesTypes.Region:
      return 375;
    case GlobalShapesTypes.VPC:
      return 325;
    case GlobalShapesTypes.SecurityGroup:
      return 200;
    case GlobalShapesTypes.Subnet:
      return 250;
    case GlobalShapesTypes.EcsService:
    case GlobalShapesTypes.EcsCluster:
      return 100;
    default:
      return 50;
  }
};

export const getResizeDirections = (
  elementView: dia.ElementView
): ui.FreeTransform.Directions[] => {
  if (elementView.model.prop("type") === GlobalShapesTypes.AutoScaling) {
    return ["left", "right"];
  }
  return [
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];
};

export const getPreserveAspectRatio = (
  elementView: dia.ElementView
): boolean => {
  return elementView.model.prop("type") !== GlobalShapesTypes.AutoScaling;
};

export const validateEmbedding = (
  childView: dia.ElementView,
  parentView: dia.ElementView
): boolean => {
  const childsName: LocalShapesTypes = childView.model.prop("localType");
  const parentsName: LocalShapesTypes = parentView.model.prop("localType");

  return validEmbedCombinations.some(
    (combination) =>
      combination.parentsName === parentsName &&
      combination.validChildren.includes(childsName)
  );
};

export const validateConnection = (
  cellViewS: dia.CellView,
  magnetS: SVGElement,
  cellViewT: dia.CellView,
  magnetT: SVGElement
): boolean => {
  if (cellViewT.model.isLink() || cellViewS.model.isLink()) return false;
  if (cellViewS === cellViewT) return false;
  return magnetT && magnetT.getAttribute("port-group") === "in";
};

export const getHaloMagnet = (
  elementView: dia.ElementView,
  end: "source" | "target"
): SVGElement => {
  if (end === "target")
    return elementView.el.querySelector('[magnet="passive"]') || elementView.el;
  return elementView.el.querySelector('[magnet="true"]') || elementView.el;
};

export const addLinkTools = (linkView: dia.LinkView): void => {
  const linkTools = joint.linkTools;
  const toolsView = new dia.ToolsView({
    name: "link-pointerdown",
    tools: [
      new linkTools.Vertices(),
      new linkTools.Segments(),
      new linkTools.Remove(),
      new linkTools.Boundary({ padding: 15, useModelGeometry: true }),
    ],
  });

  linkView.addTools(toolsView);
};

export const updateGridLayout = (element: dia.Element): void => {
  if (!groupList.includes(element.prop("type"))) return;

  const padding = 25;

  layout.GridLayout.layout(element.getEmbeddedCells(), {
    columns: 3,
    parentRelative: true,
    deep: true,
    rowGap: padding,
    columnGap: 30,
    marginX: padding,
    marginY: padding,
  });

  updateGroupSize(element);
};

export const updateGroupSize = (element: dia.Element): void => {
  if (!groupList.includes(element.prop("type"))) return;

  element.fitEmbeds({ padding: 25 });
  const sizeAfterFitEmbeds = element.prop("size");
  const minGroupSize = getMinDimensions(element);

  if (sizeAfterFitEmbeds.width < minGroupSize) {
    element.resize(minGroupSize, element.prop("size/height"));
  }
  if (sizeAfterFitEmbeds.height < minGroupSize) {
    element.resize(element.prop("size/width"), minGroupSize);
  }
};

const validEmbedCombinations: {
  parentsName: LocalShapesTypes;
  validChildren: LocalShapesTypes[];
}[] = [
  {
    parentsName: LocalShapesTypes.AutoScaling,
    validChildren: [LocalShapesTypes.EC2],
  },
  {
    parentsName: LocalShapesTypes.EcsService,
    validChildren: [LocalShapesTypes.ECSTask],
  },
  {
    parentsName: LocalShapesTypes.EcsCluster,
    validChildren: [LocalShapesTypes.EcsService],
  },
  {
    parentsName: LocalShapesTypes.Region,
    validChildren: [
      ...validEmebedCombinationConsts,
      LocalShapesTypes.VPC,
      LocalShapesTypes.Subnet,
      LocalShapesTypes.SecurityGroup,
    ],
  },
  {
    parentsName: LocalShapesTypes.VPC,
    validChildren: [
      ...validEmebedCombinationConsts,
      LocalShapesTypes.Subnet,
      LocalShapesTypes.SecurityGroup,
    ],
  },
  {
    parentsName: LocalShapesTypes.Subnet,
    validChildren: [
      ...validEmebedCombinationConsts,
      LocalShapesTypes.SecurityGroup,
    ],
  },
  {
    parentsName: LocalShapesTypes.SecurityGroup,
    validChildren: validEmebedCombinationConsts,
  },
];

export const defaultGroupShapeMarkup = [
  {
    tagName: "rect",
    selector: "body",
  },
  {
    tagName: "rect",
    selector: "background",
  },
  {
    tagName: "image",
    selector: "icon",
  },
  {
    tagName: "text",
    selector: "label",
  },
];

export const defaultTextWrap = {
  height: 20,
  ellipsis: true,
  width: "300%",
};

export const defaultGroupShapeAttrs = {
  body: {
    refWidth: "100%",
    refHeight: "100%",
    fill: "transparent",
    stroke: "blue",
    strokeWidth: "3px",
  },
  background: {
    fill: "blue",
    x: "-25px",
    width: 25,
    refHeight: "70%",
  },
  label: {
    text: "Security",
    fill: "white",
    transform: "translate(-17, 40), rotate(-90)",
    textAnchor: "end",
    fontSize: 10,
    fontWeight: "bold",
  },
  icon: {
    href: "icons/other/shield.png",
    width: 15,
    height: 15,
    refX: -20,
    refY: 5,
  },
};
