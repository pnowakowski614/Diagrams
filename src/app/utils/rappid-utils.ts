import * as joint from "@clientio/rappid";
import { dia, layout, ui } from "@clientio/rappid";
import { GlobalShapesTypes, LocalShapesTypes } from "../types/enums";
import { DbCellAttrs, GraphInfoCells } from "../types/types";
import store from "../store/store";
import {
  AutoScaling,
  CustomLink,
  ECSCluster,
  ECSService,
  NodeShape,
  SecurityGroup,
  Subnet,
  VPC,
} from "../shapes";
import { omit } from "lodash";
import { Region } from "../shapes/region";

export const defaultShapeLabelAttrs = {
  fontSize: 10,
  textAnchor: "middle",
  refX: "50%",
  refY: "110%",
};

export const defaultStencilLayoutOptions = {
  marginX: -13,
  columns: 1,
  rowHeight: 65,
};

export const getShapeLabelWidth = (cellType: string) => {
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

const validEmebedCombinationConsts = [
  LocalShapesTypes.NodeShape,
  LocalShapesTypes.ECSTask,
  LocalShapesTypes.EC2,
  LocalShapesTypes.EcsService,
  LocalShapesTypes.EcsCluster,
];

export const groupList = [
  GlobalShapesTypes.VPC,
  GlobalShapesTypes.SecurityGroup,
  GlobalShapesTypes.Region,
  GlobalShapesTypes.Subnet,
  GlobalShapesTypes.EcsCluster,
  GlobalShapesTypes.EcsService,
];

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

export const colorChangeShapes = [
  GlobalShapesTypes.Region,
  GlobalShapesTypes.VPC,
  GlobalShapesTypes.SecurityGroup,
  GlobalShapesTypes.Subnet,
  GlobalShapesTypes.CustomLink,
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

export const filterDiagramInfo = (graph: dia.Graph) => {
  const graphJSON = graph.toJSON();
  const newCells = graphJSON.cells.map((cell: GraphInfoCells) => {
    if (cell.type !== GlobalShapesTypes.CustomLink) {
      return {
        type: cell.type,
        position: cell.position,
        size: cell.size,
        id: cell.id,
        localType: cell.localType,
        z: cell.z,
        maxLinks: cell.maxLinks!,
        text: cell.attrs.label?.text,
        icon: cell.attrs.icon?.href,
        groupShapeColor: cell.attrs.body?.stroke,
      };
    } else {
      return {
        type: cell.type,
        source: cell.source,
        target: cell.target,
        id: cell.id,
        z: cell.z,
        vertices: cell.vertices,
        linkColor: cell.attrs?.line?.stroke!,
      };
    }
  });
  return newCells;
};

export const returnShapeAttrs = (cell: DbCellAttrs) => {
  switch (cell.type) {
    case GlobalShapesTypes.NodeShape:
      return {
        label: {
          ...defaultShapeLabelAttrs,
          text: cell.text,
        },
        icon: {
          href: cell.icon,
        },
      };
    case (GlobalShapesTypes.AutoScaling,
    GlobalShapesTypes.EcsService,
    GlobalShapesTypes.EcsService):
      return {
        label: {
          text: cell.text,
        },
      };
    case (GlobalShapesTypes.VPC,
    GlobalShapesTypes.Region,
    GlobalShapesTypes.Subnet,
    GlobalShapesTypes.SecurityGroup):
      return {
        body: {
          stroke: cell.groupShapeColor,
        },
        background: {
          fill: cell.groupShapeColor,
        },
        label: {
          text: cell.text,
        },
      };
    default:
      return {
        line: {
          stroke: cell.linkColor,
        },
      };
  }
};

export const getGraphFromDB = (graph: dia.Graph) => {
  const diagramCells: [DbCellAttrs] = store.getState().diagrams.currentDiagram!;
  diagramCells.forEach((cell) => {
    const createCell = () => {
      switch (cell.type) {
        case GlobalShapesTypes.NodeShape: {
          const newShape = new NodeShape(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.AutoScaling: {
          const newShape = new AutoScaling(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.EcsCluster: {
          const newShape = new ECSCluster(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.EcsService: {
          const newShape = new ECSService(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.SecurityGroup: {
          const newShape = new SecurityGroup(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.Subnet: {
          const newShape = new Subnet(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.Region: {
          const newShape = new Region(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        case GlobalShapesTypes.VPC: {
          const newShape = new VPC(
            omit(cell, ["text", "icon", "groupShapeColor"])
          );
          return newShape.attr(returnShapeAttrs(cell));
        }
        default: {
          const newLink = new CustomLink(omit(cell, ["linkColor"]));
          return newLink.attr(returnShapeAttrs(cell));
        }
      }
    };

    const cellToAdd = createCell();
    graph.addCell(cellToAdd);
  });
};
