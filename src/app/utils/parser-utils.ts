import { dia } from "@clientio/rappid";
import { DbCellAttrs } from "../types/types";
import { GlobalShapesTypes } from "../types/enums";
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
import { defaultShapeLabelAttrs } from "./config-utils";

export const filterDiagramInfo = (graph: dia.Graph) => {
  const graphJSON = graph.toJSON();
  const parsedCells = graphJSON.cells.map((cell: dia.Cell.JSON) => {
    const {
      type,
      position,
      size,
      id,
      localType,
      z,
      ports,
      maxLinks,
      source,
      target,
      vertices,
    } = cell;
    if (cell.type !== GlobalShapesTypes.CustomLink) {
      return {
        type,
        position,
        size,
        id,
        localType,
        z,
        ports,
        maxLinks: maxLinks!,
        text: cell.attrs?.label?.text,
        icon: cell.attrs?.icon?.href,
        groupShapeColor: cell.attrs?.body?.stroke,
      };
    } else {
      return {
        type,
        source,
        target,
        id,
        z,
        vertices,
        linkColor: cell.attrs?.line?.stroke!,
      };
    }
  });
  return parsedCells;
};

export const setShapeAttrs = (cell: DbCellAttrs) => {
  const { type, text, icon, groupShapeColor, linkColor } = cell;
  switch (type) {
    case GlobalShapesTypes.NodeShape:
      return {
        label: {
          ...defaultShapeLabelAttrs,
          text,
        },
        icon: {
          href: icon,
        },
      };
    case (GlobalShapesTypes.AutoScaling,
    GlobalShapesTypes.EcsService,
    GlobalShapesTypes.EcsService):
      return {
        label: { text },
      };
    case (GlobalShapesTypes.VPC,
    GlobalShapesTypes.Region,
    GlobalShapesTypes.Subnet,
    GlobalShapesTypes.SecurityGroup):
      return {
        body: {
          stroke: groupShapeColor,
        },
        background: {
          fill: groupShapeColor,
        },
        label: { text },
      };
    default:
      return {
        line: {
          stroke: linkColor,
        },
      };
  }
};

const createCell = (cell: DbCellAttrs) => {
  const omittedAttrs = omit(cell, ["text", "icon", "groupShapeColor"]);
  switch (cell.type) {
    case GlobalShapesTypes.NodeShape: {
      const newShape = new NodeShape(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.AutoScaling: {
      const newShape = new AutoScaling(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.EcsCluster: {
      const newShape = new ECSCluster(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.EcsService: {
      const newShape = new ECSService(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.SecurityGroup: {
      const newShape = new SecurityGroup(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.Subnet: {
      const newShape = new Subnet(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.Region: {
      const newShape = new Region(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    case GlobalShapesTypes.VPC: {
      const newShape = new VPC(omittedAttrs);
      return newShape.attr(setShapeAttrs(cell));
    }
    default: {
      const newLink = new CustomLink(omit(cell, ["linkColor"]));
      return newLink.attr(setShapeAttrs(cell));
    }
  }
};

export const getGraphFromDB = (graph: dia.Graph) => {
  const diagramCells: [DbCellAttrs] = store.getState().diagrams.currentDiagram!;
  diagramCells.forEach((cell) => {
    const cellToAdd = createCell(cell);
    graph.addCell(cellToAdd);
  });
};
